import { NextFunction, Request, Response } from 'express';
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { authenticate } from '../authentication/authenticateToken';
import ProductService from '../services/product.service';
import cloudinary from 'cloudinary';
import multer from 'multer';
import { FindOptionsOrder, ILike, Like } from 'typeorm';

export const upload = multer({ dest: 'uploads/' });

cloudinary.v2.config({
  cloud_name: 'daib9xm2h',
  api_key: '443494128387516',
  api_secret: 'E7_1hdKaQPicFOinTpxpPQvovhU',
});

@controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @httpPost('/')
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    const search = req.query?.search || '';
    console.log('body', req);
    const { page = 0, perPage = 1 } = req.body;
    const options: any = {
      order: {
        createdAt: 'DESC',
      },
      where: {
        name: ILike(`%${search}%`),
      },

      skip: page,
      take: perPage,
    };
    const products = await this.productService.getProducts(options);
    const totalProducts = await this.productService.countTotal();
    console.log(products);
    return res.json({
      success: true,
      message: 'ok',
      result: products,
      pagination: {
        page,
        perPage,
        totalPage: Math.ceil(totalProducts / perPage),
      },
    });
  }

  @httpPost('/detail')
  async getProductsByCategory(req: Request, res: Response, next: NextFunction) {
    const { offset = 1, limit = 5, categoryId } = req.body;
    const options: any = { where: { categoryId }, offset, limit };
    const productsByCategory = await this.productService.getProducts(options);
    return res.json({
      success: true,
      message: 'ok',
      result: productsByCategory,
      pagination: {
        offset,
        limit,
      },
    });
  }

  @httpPut('/:id/upload', upload.single('file'))
  async upload(req: Request, res: Response, next: NextFunction) {
    const { file } = req;
    const { id } = req.params;
    const product = await this.productService.getProduct(id);
    if (!file) {
      return;
    }
    const result = await cloudinary.v2.uploader.upload(file.path);
    const newProductWithImage = await this.productService.updateProduct({
      ...product,
      imgSrc: result.url,
    });
    return res.json(newProductWithImage);
  }
  @httpPost('/create')
  async createProduct(req: Request, res: Response, next: NextFunction) {
    const product = await this.productService.createProduct(req.body);
    return res.json(product);
  }
}

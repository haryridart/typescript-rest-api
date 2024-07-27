import {NextFunction, Response} from "express";
import { UserRequest } from "../type/user-request";
import { CreateAddressRequest, GetAddressRequest } from "../model/address-model";
import { AddressService } from "../service/address-service";
import { logger } from "../application/logging";
export class AddressController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const request: CreateAddressRequest = req.body as CreateAddressRequest;
            request.contact_id = Number(req.params.contactId);
            const response =  await AddressService.create(req.user!, request);
            logger.debug("response: " + JSON.stringify(response));
            res.status(200).json({
                data: response
            });
        }catch(error){
            next(error);
        }
    }
    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const request: GetAddressRequest = {
                contact_id: Number(req.params.contactId),
                id: Number(req.params.addressId)
            }
            const response =  await AddressService.get(req.user!, request);
            res.status(200).json({
                data: response
            })
        }catch(error){
            next(error);
        }
    }
}
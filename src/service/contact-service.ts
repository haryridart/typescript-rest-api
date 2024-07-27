import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse, UpdateContactRequest } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class ContactService{
    static async create(user : User, request: CreateContactRequest): Promise<ContactResponse>{
        const createRequest = Validation.validate(ContactValidation.CREATE, request);
        const record = {
            ...createRequest,
            ...{username: user.username}
        };
        const contact = await prismaClient.contact.create({
            data: record   
        });
        
        return toContactResponse(contact);
    }
    static async checkContactExist(username: string, contactId: number): Promise<Contact>{
        const contact = await prismaClient.contact.findUnique({
            where: {
                id: contactId,
                username: username
            }
        });
        if(contact){
            return contact;
        }else{
            throw new ResponseError(404, "Contact not found");
        }
    }
    static async get(user: User, id: number): Promise<ContactResponse>{
        const contact = await this.checkContactExist(user.username, id);
        return toContactResponse(contact);
    }
    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse>{
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request);
        await this.checkContactExist(user.username, updateRequest.id);
        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username
            },
            data: updateRequest
        });
        return toContactResponse(contact);
    }
}
import { StringController } from './';

export class MailController extends StringController {
    public name: string = '';
    public email: string = '';
    public object: 'info' | 'work' | 'other' = 'info';
    public customObject: string = '';
    public message: string = '';
}

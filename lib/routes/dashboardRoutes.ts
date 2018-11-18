import {Request, Response} from "express";

export class DashboardRoutes {
    
    public router(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
    }
}

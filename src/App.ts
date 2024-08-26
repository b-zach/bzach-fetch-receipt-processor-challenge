import express from 'express';
import {Receipt} from './schema';
import {StorageService, PointCalculator, ReceiptValidator} from './utilities';

class App {
    constructor(
        public app = express(),
        private readonly storageService = new StorageService(),
        private readonly pointCalculator = new PointCalculator(),
        private readonly receiptValidator = new ReceiptValidator(),
) {
        this.app = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.app.use(express.json());

        this.app.post('/receipts/process', (req, res) => {
            let receipt: Receipt;

            try {
                receipt = req.body;
                this.receiptValidator.validate(receipt);
            } catch {
                res.statusMessage = 'The receipt is invalid';
                res.sendStatus(400);
                return;
            }

            const points = this.pointCalculator.calculatePoints(receipt!);
            const id = this.storageService.storePoints(points);

            res.json({id});
        });

        this.app.get('/receipts/:id/points', (req, res) => {
            let points: number;
            
            try {
                points = this.storageService.getPoints(req.params.id);
            } catch {
                res.statusMessage = 'No receipt found for that id';
                res.sendStatus(404);
                return;
            }
            
            res.json({points: points!});
        })
    }
}

export default new App().app;
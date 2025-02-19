const paymentController = {
    async createPayment(req, res) {
        try {
            res.status(201).json({message: "Payment create sucessfuly"});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error.mesage});
            
        }
    }
}

export default paymentController;
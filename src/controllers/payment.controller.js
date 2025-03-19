import { z } from "zod";

const paymentSchema = z.object({
  data: z.string().datetime(),
  valor: z.number().positive(),  
  numero: z.number().int().positive(),
  observacao: z.string().optional()
});

const paymentController = {
  async createPayment(req, res) {
    try {
      const { nome, email, senha } = req.body;
      paymentSchema.parse({ nome, email, senha });
      console.log({ nome, email, senha });
      res.status(201).json({ message: "Payment create sucessfuly" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Erro de Validação",
          errors: error.errors.map(
            err => ({
              atributo: err.path[0],
              messagem: err.message,
            })
          )
         });
      }
      res.status(500).json({ message: error.mesage });
    }
  },

  async updatePayment(req, res){
    try {
      const {id} = req.params;
      const{valor, numero, data, observacao} = req.body;  
      paymentSchema.parse({valor, numero, data, observacao});
      res.status(200).json({message: 'Payment update sucessfuly',
                                      data: {id, valor, numero, data, observacao}});
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({message:'Vadilation error', detail:error.errors}); 
     }
     return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async delePayment(req, res){
    try {
      const {id} = req.params;
      return res.status(200).json({message: 'Payment deleted', id});
    } catch (error) {
      return res.status(500).json({message: 'Internal server error'});
    }
  },
};

export default paymentController;


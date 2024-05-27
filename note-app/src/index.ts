import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import noteRoutes from './routes/noteRoutes';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', noteRoutes);
app.use(express.static(path.join(__dirname, '../public')));
mongoose.connect('mongodb+srv://duduvsc2:123@cluster0.prbapep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  dbName: 'Cluster0',
}).then(() => {
  console.log('Conexão com o banco realizada');
}).catch((error) => {
  console.error('Erro ao conectar ao banco', error);
});
app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});

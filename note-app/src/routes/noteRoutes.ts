import { Router } from 'express';
import Note from '../models/note';

const router = Router();

// Criar uma nova nota
router.post('/notes', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content
    });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!note) {
      return res.status(404).send();
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

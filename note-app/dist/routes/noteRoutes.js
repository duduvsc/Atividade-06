"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_1 = __importDefault(require("../models/note"));
const router = (0, express_1.Router)();
// Criar uma nova nota
router.post('/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = new note_1.default({
            title: req.body.title,
            content: req.body.content
        });
        yield note.save();
        res.status(201).send(note);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Obter todas as notas
router.get('/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield note_1.default.find();
        res.status(200).send(notes);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Obter uma nota por ID
router.get('/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield note_1.default.findById(req.params.id);
        if (!note) {
            return res.status(404).send();
        }
        res.status(200).send(note);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Atualizar uma nota por ID
router.patch('/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield note_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!note) {
            return res.status(404).send();
        }
        res.status(200).send(note);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Deletar uma nota por ID
router.delete('/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield note_1.default.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).send();
        }
        res.status(200).send(note);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;

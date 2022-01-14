import {Router} from "express";
import {deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario} from "../controllers/usuarios.controllers";

const router = Router();


router.get('/', getUsuarios)
router.post('/', postUsuario)
router.get('/:id', getUsuario)
router.put('/:id', putUsuario)
router.delete('/:id', deleteUsuario)



export default router;

import { Router } from "express";
import auth from "../../middlewares/auth";
import { getGenres } from "./controller";

const router: Router = Router();

router.use(auth);

router.route('/')
    .get(getGenres);

export default router;
import { Router } from "express";
import auth from "../../middlewares/auth";
import { searchBooks, autocompleteBooks } from "./controller";

const router: Router = Router();

router.use(auth);

router.route('/autocomplete')
    .get(autocompleteBooks);

router.route('/search')
    .post(searchBooks);

export default router;
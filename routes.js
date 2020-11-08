const express = require('express')
const routes = express.Router()
const recipes = require('./recipes')

routes.get("/", recipes.home)
routes.get("/Receitas", recipes.recipes)
routes.get("/Sobre", recipes.about)
routes.get("/Receitas/:id", recipes.recipe)


routes.get("/admin/Receitas", recipes.index)
routes.get("/admin/Receitas/criar", recipes.create)
routes.get("/admin/Receitas/:id", recipes.recipe_admin)
routes.get("/admin/Receitas/:id/edit", recipes.recipe_admin_edit)

routes.post("/admin/Receitas", recipes.post)

module.exports = routes

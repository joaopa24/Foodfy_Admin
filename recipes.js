const fs = require("fs")
const data = require("./data.json")
const { json } = require("express")

exports.home = function (req, res) {
    return res.render("home", {items:data.recipes})
}
exports.recipes = function (req, res) {
    return res.render("receitas" , {items:data.recipes})
}
exports.about = function (req, res) {
    return res.render("sobre")
}
exports.recipe = function (req, res) {
    const id = req.params.id;
    const Recipes = data.recipes.find(function(recipe){
      if ( recipe.id == id){
          return true
      }
      if (!recipe.id){
          return res.send("video not found")
      }
    })

    const recipe = {
        ...Recipes,
        
    }
    return res.render("Receita" , { recipe })
}
exports.index = function (req, res) {
    return res.render("Admin/index", {recipes:data.recipes})
}
exports.create = function (req, res) {
    return res.render("Admin/create", {items:data.recipes})
}
exports.recipe_admin = function(req,res){
    const id = req.params.id;
    const Recipes = data.recipes.find(function(recipe){
      if ( recipe.id == id){
          return true
          
      }
      if (!recipe.id){
          return res.send("video not found")
      }
    })
    
    const recipe = {
        ...Recipes, 
    }
    
    return res.render("Admin/recipe" , { recipe })
}
exports.recipe_admin_edit = function (req, res) {
    return res.render("Admin/edit", {items:data.recipes})
}
exports.post = function (req,res) {
    return res.send(req.body)
}
exports.put = function (req,res) {
    return res.send(req.body)
}
exports.delete = function (req,res) {
    
}
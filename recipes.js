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
    return res.render("Admin/create")
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
    const keys = Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == "")
        return res.send("porfavor preencha todos os campos")
    }


    let {image_url,title,description,Id_Url,featured,ingredients,preparation,textarea} = req.body
    let id = Id_Url
    let image = image_url

    data.recipes.push({
        id,
        image,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
    if(err) return res.send("write file error!")
    return res.redirect(`/admin/Receitas/${id}`)
    })
}
exports.put = function (req,res) {
    
}

exports.delete = function (req,res) {
    return res.send("deletado")
}
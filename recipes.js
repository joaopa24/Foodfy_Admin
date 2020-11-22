const fs = require("fs")
const data = require("./data.json")
const { json } = require("express")

exports.home = function (req, res) {
    return res.render("home", { items: data.recipes })
}
exports.recipes = function (req, res) {
    return res.render("receitas", { items: data.recipes })
}
exports.about = function (req, res) {
    return res.render("sobre")
}
exports.recipe = function (req, res) {
    const id = req.params.id;
    const Recipes = data.recipes.find(function (recipe) {
        if (recipe.id == id) {
            return true
        }
        if (!recipe.id) {
            return res.send("video not found")
        }
    })

    const recipe = {
        ...Recipes,

    }
    return res.render("Receita", { recipe })
}
exports.index = function (req, res) {
    return res.render("Admin/index", { recipes: data.recipes })
}
exports.create = function (req, res) {
    return res.render("Admin/create")
}
exports.recipe_admin = function (req, res) {
    const id = req.params.id;
    const Recipes = data.recipes.find(function (recipe) {
        if (recipe.id == id) {
            return true

        }
        if (!recipe.id) {
            return res.send("video not found")
        }
    })

    const recipe = {
        ...Recipes,
    }

    return res.render("Admin/recipe", { recipe })
}
exports.recipe_admin_edit = function (req, res) {
    const { id } = req.params
    const foundrecipe = data.recipes.find(function (recipe) {
        return recipe.id == id
    })
    if (!foundrecipe) {
        return res.send("Professor não encontrado")
    }

    const recipe = {
        ...foundrecipe
    }

    return res.render(`Admin/edit`, { recipe })
}
exports.post = function (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "")
            return res.send("porfavor preencha todos os campos")
    }


    let { image, title, description, id, featured, ingredients, preparation, textarea } = req.body
    /* Resolver problema com identificação */

    data.recipes.push({
        id,
        image,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write file error!")
        return res.redirect(`/admin/Receitas/${id}`)
    })
}
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const FoundRecipe = data.recipes.find(function (recipe, Foundindex) {
        if (recipe.id == id) {
            index = Foundindex
            return true
        }
    })
    
    if(!FoundRecipe){
        return res.send("Receita não encontrada")
    }

    const Recipe = {
        ...FoundRecipe,
        ...req.body
        /* só funciona se colocar o req.body tbm*/
    }
    
    data.recipes[index] = Recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write error!")

        return res.redirect(`/admin/Receitas/${id}`)
    })
}
exports.delete = function (req, res) {
    const { id } = req.body
    
    const filteredrecipe = data.recipes.filter(function (recipe){
        return recipe.id != id
    })

    data.recipes = filteredrecipe
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write error!")

        return res.redirect("/admin/Receitas")
    })
}
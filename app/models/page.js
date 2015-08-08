module.exports = function (sequelize, DataTypes) {

    var Page = sequelize.define('Page', {
        pageName: DataTypes.STRING,
        pageOrder: DataTypes.STRING,

    }, {
        classMethods: {
            associate: function (models) {
                // example on how to add relations
                // Article.hasMany(models.Comments);
                Page.hasMany(models.Question);
            }
        }
    });

    return Page;
};
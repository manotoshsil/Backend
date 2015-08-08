module.exports = function (sequelize, DataTypes) {

    var Question = sequelize.define('Question', {

        questionText: DataTypes.STRING,
        questionType: DataTypes.STRING,

    }, {
        classMethods: {
            associate: function (models) {
                // example on how to add relations
                // Article.hasMany(models.Comments);

            }
        }
    });

    return Question;
};
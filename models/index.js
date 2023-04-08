const User = require('./User');
const ContentPost = require('./ContentPost');
const Comments = require('./Comments');

User.hasMany(ContentPost, {
  foreignKey: 'user_id',
});

ContentPost.belongsTo(User, {
  foreignKey: 'user_id'
});

Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

Comments.belongsTo(ContentPost, {
    foreignKey: 'userPost_id'
});

// User can have many comment
User.hasMany(Comments, {
    foreignKey: 'user_id'
})
// Post can have many comments
Post.hasMany(Comments, {
    foreignKey: 'userPost_id'
});

module.exports = { User, ContentPost, Comments };
module.exports = (req, res, next) => {
    setTimeout(next, 100 + Math.floor(Math.random() * 1000));
};
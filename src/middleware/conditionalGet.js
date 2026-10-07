const crypto = require('crypto');

function generateETag(data) {
    const content = JSON.stringify(data);

    const hash = crypto
        .createHash('sha256')
        .update(content)
        .digest('hex');

    return `"${hash}"`;
}

function conditionalGet(req, res, next) {
    res.setETag = function (data) {
        const etag = generateETag(data);

        res.set('ETag', etag);

        const ifNoneMatch = req.headers['if-none-match'];

        if (ifNoneMatch === '*') {
            return res.status(304).end();
        }

        if (ifNoneMatch) {
            const clientETags = ifNoneMatch
                .split(',')
                .map(tag => tag.trim());

            if (clientETags.includes(etag)) {
                return res.status(304).end();
            }
        }

        return res.status(200).json(data);
    };

    next();
}

module.exports = {
    conditionalGet
};
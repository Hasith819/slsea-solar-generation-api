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
    res.setConditionalGet = function (data) {
        const etag = generateETag(data);

        res.set('ETag', etag);

        let lastModified = null;

        if (data.updatedAt) {
            lastModified = new Date(
                Math.floor(new Date(data.updatedAt).getTime() / 1000) * 1000
            );

            res.set(
                'Last-Modified',
                lastModified.toUTCString()
            );
        }

        const ifNoneMatch = req.headers['if-none-match'];


        if (ifNoneMatch) {
            const clientETags = ifNoneMatch
                .split(',')
                .map(tag => tag.trim());

            if (clientETags.includes(etag)) {
                return res.status(304).end();
            }
        }

        const ifModifiedSince =
            req.headers['if-modified-since'];

        if (ifModifiedSince && lastModified) {
            const clientDate = new Date(ifModifiedSince);

            if (
                !Number.isNaN(clientDate.getTime()) &&
                lastModified <= clientDate
            ) {
                return res.status(304).end();
            }
        }

        return res.status(200).json(data);
    };

    res.setETag = res.setConditionalGet;

    next();
}

module.exports = {
    conditionalGet
};
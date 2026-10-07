const GridSubstation = require('../models/GridSubstation');
const District = require('../models/District');
const SolarInstallation = require('../models/SolarInstallation');

async function authorizeProvince(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({
                code: 'AUTHENTICATION_REQUIRED',
                message: 'Authentication required',
                detail: 'A valid authenticated user is required.'
            });
        }

        // National users can access any province
        if (req.user.jurisdictionType === 'national') {
            return next();
        }

        // Province users can access only their own province
        if (req.user.jurisdictionType === 'province') {
            if (req.params.provinceId !== req.user.jurisdictionId) {
                return res.status(403).json({
                    code: 'JURISDICTION_ACCESS_DENIED',
                    message: 'Jurisdiction access denied',
                    detail: 'You are not authorized to access this province.'
                });
            }

            return next();
        }

        // District users can access the province containing their district
        if (req.user.jurisdictionType === 'district') {
            const district = await District.findById(
                req.user.jurisdictionId
            );

            if (!district) {
                return res.status(403).json({
                    code: 'INVALID_JURISDICTION',
                    message: 'Invalid jurisdiction',
                    detail: 'The user jurisdiction could not be found.'
                });
            }

            if (district.provinceId !== req.params.provinceId) {
                return res.status(403).json({
                    code: 'JURISDICTION_ACCESS_DENIED',
                    message: 'Jurisdiction access denied',
                    detail: 'You are not authorized to access this province.'
                });
            }

            return next();
        }

        return res.status(403).json({
            code: 'ACCESS_DENIED',
            message: 'Access denied',
            detail: 'You are not authorized to access this province.'
        });

    } catch (error) {
        next(error);
    }
}

async function authorizeDistrict(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({
                code: 'AUTHENTICATION_REQUIRED',
                message: 'Authentication required',
                detail: 'A valid authenticated user is required.'
            });
        }

        if (req.user.jurisdictionType === 'national') {
            return next();
        }

        const district = await District.findById(
            req.params.districtId
        );

        if (!district) {
            return res.status(404).json({
                code: 'DISTRICT_NOT_FOUND',
                message: 'District not found',
                detail: `No district exists with id '${req.params.districtId}'.`
            });
        }

        if (req.user.jurisdictionType === 'district') {
            if (district._id !== req.user.jurisdictionId) {
                return res.status(403).json({
                    code: 'JURISDICTION_ACCESS_DENIED',
                    message: 'Jurisdiction access denied',
                    detail: 'You are not authorized to access this district.'
                });
            }

            return next();
        }

        if (req.user.jurisdictionType === 'province') {
            if (district.provinceId !== req.user.jurisdictionId) {
                return res.status(403).json({
                    code: 'JURISDICTION_ACCESS_DENIED',
                    message: 'Jurisdiction access denied',
                    detail: 'You are not authorized to access this district.'
                });
            }

            return next();
        }

        return res.status(403).json({
            code: 'ACCESS_DENIED',
            message: 'Access denied',
            detail: 'You are not authorized to access this district.'
        });

    } catch (error) {
        next(error);
    }
}

async function authorizeSubstation(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({
                code: 'AUTHENTICATION_REQUIRED',
                message: 'Authentication required',
                detail: 'A valid authenticated user is required.'
            });
        }

        const substation = await GridSubstation.findById(
            req.params.substationId
        );

        if (!substation) {
            return res.status(404).json({
                code: 'SUBSTATION_NOT_FOUND',
                message: 'Grid substation not found',
                detail: `No grid substation exists with id '${req.params.substationId}'.`
            });
        }

        // National users can access any substation
        if (req.user.jurisdictionType === 'national') {
            return next();
        }

        // District users can access substations in their district
        if (req.user.jurisdictionType === 'district') {
            if (substation.districtId !== req.user.jurisdictionId) {
                return res.status(403).json({
                    code: 'JURISDICTION_ACCESS_DENIED',
                    message: 'Jurisdiction access denied',
                    detail: 'You are not authorized to access this grid substation.'
                });
            }

            return next();
        }

        // Province users can access substations in their province
        if (req.user.jurisdictionType === 'province') {
            const district = await District.findById(
                substation.districtId
            );

            if (!district) {
                return res.status(403).json({
                    code: 'INVALID_JURISDICTION',
                    message: 'Invalid jurisdiction',
                    detail: 'The substation district could not be found.'
                });
            }

            if (district.provinceId !== req.user.jurisdictionId) {
                return res.status(403).json({
                    code: 'JURISDICTION_ACCESS_DENIED',
                    message: 'Jurisdiction access denied',
                    detail: 'You are not authorized to access this grid substation.'
                });
            }

            return next();
        }

        return res.status(403).json({
            code: 'ACCESS_DENIED',
            message: 'Access denied',
            detail: 'You are not authorized to access this grid substation.'
        });

    } catch (error) {
        next(error);
    }
}

async function authorizeInstallation(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({
                code: 'AUTHENTICATION_REQUIRED',
                message: 'Authentication required',
                detail: 'A valid authenticated user is required.'
            });
        }

        const installation = await SolarInstallation.findById(
            req.params.installationId
        );

        if (!installation) {
            return res.status(404).json({
                code: 'INSTALLATION_NOT_FOUND',
                message: 'Solar installation not found',
                detail: `No solar installation exists with id '${req.params.installationId}'.`
            });
        }

        // National users can access any installation
        if (req.user.jurisdictionType === 'national') {
            return next();
        }

        const substation = await GridSubstation.findById(
            installation.substationId
        );

        if (!substation) {
            return res.status(403).json({
                code: 'INVALID_JURISDICTION',
                message: 'Invalid jurisdiction',
                detail: 'The installation substation could not be found.'
            });
        }

        // District users can access installations in their district
        if (req.user.jurisdictionType === 'district') {
            if (substation.districtId !== req.user.jurisdictionId) {
                return res.status(403).json({
                    code: 'JURISDICTION_ACCESS_DENIED',
                    message: 'Jurisdiction access denied',
                    detail: 'You are not authorized to access this solar installation.'
                });
            }

            return next();
        }

        // Province users can access installations in their province
        if (req.user.jurisdictionType === 'province') {
            const district = await District.findById(
                substation.districtId
            );

            if (!district) {
                return res.status(403).json({
                    code: 'INVALID_JURISDICTION',
                    message: 'Invalid jurisdiction',
                    detail: 'The installation district could not be found.'
                });
            }

            if (district.provinceId !== req.user.jurisdictionId) {
                return res.status(403).json({
                    code: 'JURISDICTION_ACCESS_DENIED',
                    message: 'Jurisdiction access denied',
                    detail: 'You are not authorized to access this solar installation.'
                });
            }

            return next();
        }

        return res.status(403).json({
            code: 'ACCESS_DENIED',
            message: 'Access denied',
            detail: 'You are not authorized to access this solar installation.'
        });

    } catch (error) {
        next(error);
    }
}


module.exports = {
    authorizeProvince,
    authorizeDistrict,
    authorizeSubstation,
    authorizeInstallation
};
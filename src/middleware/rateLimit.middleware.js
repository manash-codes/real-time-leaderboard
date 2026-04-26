
const rateLimitMap = new Map();

function createRateLimit(maxRequests = 10, windowMs = 60 * 1000) {
    return (req, res, next) => {
        const key = req.user ? req.user._id.toString() : req.ip;
        const now = Date.now();

        const entry = rateLimitMap.get(key);

        if (!entry || now > entry.resetAt) {
            rateLimitMap.set(key, { count: 1, resetAt: now + windowMs })
            return next();
        }

        if (entry.count >= maxRequests) {
            const retryAfter = Math.ceil((entry.reset - now) / 1000);
            res.set("Retry-After", retryAfter);
            return res.status(429).json({
                success: false,
                message: `Too many requests, try again in ${retryAfter}`
            })
        }

        entry.count++;
        next();
    };
}

const scoreRateLimit = createRateLimit(20, 60 * 1000)

module.exports = { createRateLimit, scoreRateLimit };

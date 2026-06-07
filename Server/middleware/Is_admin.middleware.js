export const is_admin = (req, res, next) => {
    const user = req.user;  // Access the user object attached by verify_middleware
 
    if (user && user.userType == 'ADMIN') {
        
        next();
    } else {
        return res.status(403).send({ 'message': 'Only Admin Users are allowed to access this Endpoint' });
    }
};

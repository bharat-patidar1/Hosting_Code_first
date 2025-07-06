import jwt from "jsonwebtoken";

export const isAuthenticatedAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token; // ← get from cookie
    if (!token) return res.status(401).json({ message: "Token not found" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
     if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (decoded.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    
    req.adminId = decoded.adminId;
    req.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export const isAuthenticatedEmployee = (req, res, next) => {
  try {
    const token = req.cookies.token; // ← get from cookie
    if (!token) return res.status(401).json({ message: "Token not found" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
     if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (decoded.role !== "Employee") {
      return res.status(403).json({ message: "Access denied. Employee only." });
    }
    
    req.employeeId = decoded.employeeId;
    req.role = decoded.role;
    console.log("Chala")
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

const userRoles = {
    GUEST: 'GUEST',
    USER: 'USER',
    ADMIN: 'ADMIN',
  };
  
  const userPermissions = {
    [userRoles.GUEST]: {
      canRead: false,
      canWrite: false,
    },
    [userRoles.USER]: {
      canRead: true,
      canWrite: true,
    },
    [userRoles.ADMIN]: {
      canRead: true,
      canWrite: true,
    },
  };
  
  function checkPermission(user, action) {
    const userRole = user.role || userRoles.GUEST;
    const permissions = userPermissions[userRole];
  
    if (!permissions) {
      throw new Error(`User role "${userRole}" not found.`);
    }
  
    return permissions[action];
  }
  
  module.exports = {
    userRoles,
    userPermissions,
    checkPermission,
  };
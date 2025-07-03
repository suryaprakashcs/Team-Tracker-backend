/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [employee, manager, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login with token
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /users/managers:
 *   get:
 *     summary: Get all managers
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of managers
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/manager:
 *   post:
 *     summary: Add a new manager
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Manager created
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/empolyees:
 *   get:
 *     summary: Get all employees
 *     tags: [Empolyees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/empolyee:
 *   post:
 *     summary: Add a new employee
 *     tags: [Empolyees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/empolyee:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Empolyees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */

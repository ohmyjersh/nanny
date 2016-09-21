"use strict";
const express_1 = require("express");
const passport_1 = require("passport");
const authentication_1 = require("./controllers/authentication");
const AuthenticationController = require('./controllers/authentication');
// Middleware to require login/auth
const requireAuth = passport_1.default.authenticate('jwt', { session: false });
const requireLogin = passport_1.default.authenticate('local', { session: false });
// Constants for role types
const REQUIRE_ADMIN = "Admin", REQUIRE_OWNER = "Owner", REQUIRE_CLIENT = "Client", REQUIRE_MEMBER = "Member";
module.exports = function (app) {
    // Initializing route groups
    const apiRoutes = express_1.default.Router(), authRoutes = express_1.default.Router(), manifestRoutes = express_1.default.Router(), configurationRoutes = express_1.default.Router(), generateRoutes = express_1.default.Router();
    //=========================
    // Auth Routes
    //=========================
    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);
    // Registration route
    authRoutes.post('/register', authentication_1.AuthenticationController.register);
    // Login route
    authRoutes.post('/login', requireLogin, authentication_1.AuthenticationController.login);
    // Password reset request route (generate/send token)
    authRoutes.post('/forgot-password', authentication_1.AuthenticationController.forgotPassword);
    authRoutes.post('/reset-password/:token', authentication_1.AuthenticationController.verifyToken);
    //=========================
    // User Routes
    //=========================
    // Set user routes as a subgroup/middleware to apiRoutes
    apiRoutes.use('/user', userRoutes);
    // View user profile route
    userRoutes.get('/:userId', requireAuth, UserController.viewProfile);
    // Test protected route
    apiRoutes.get('/protected', requireAuth, function (req, res) {
        res.send({ content: 'The protected test route is functional!' });
    });
    //=========================
    // Chat Routes
    //=========================
    // Set chat routes as a subgroup/middleware to apiRoutes
    apiRoutes.use('/chat', chatRoutes);
    // View messages to and from authenticated user
    chatRoutes.get('/', requireAuth, ChatController.getConversations);
    // Retrieve single conversation
    chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation);
    // Send reply in conversation
    chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply);
    // Start new conversation
    chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation);
    //=========================
    // Payment Routes
    //=========================
    apiRoutes.use('/pay', payRoutes);
    // Webhook endpoint for Stripe
    payRoutes.post('/webhook-notify', StripeController.webhook);
    // Create customer and subscription
    payRoutes.post('/customer', requireAuth, StripeController.createSubscription);
    // Update customer object and billing information
    payRoutes.put('/customer', requireAuth, StripeController.updateCustomerBillingInfo);
    // Delete subscription from customer
    payRoutes.delete('/subscription', requireAuth, StripeController.deleteSubscription);
    // Upgrade or downgrade subscription
    payRoutes.put('/subscription', requireAuth, StripeController.changeSubscription);
    // Fetch customer information
    payRoutes.get('/customer', requireAuth, StripeController.getCustomer);
    //=========================
    // Communication Routes
    //=========================
    apiRoutes.use('/communication', communicationRoutes);
    // Send email from contact form
    communicationRoutes.post('/contact', CommunicationController.sendContactForm);
    // Set url for API group routes
    app.use('/api', apiRoutes);
};
//# sourceMappingURL=routes.js.map
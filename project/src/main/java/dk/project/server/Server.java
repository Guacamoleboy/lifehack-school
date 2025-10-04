// Package
package dk.project.server;

// Imports
import io.javalin.Javalin;
import java.sql.SQLException;

public class Server {

    // Attributes
    private Javalin app;

    // __________________________________________________

    public void start(int port) throws SQLException {

        // Resource folder
        app = Javalin.create(config -> {
            config.staticFiles.add("/static"); // folder i resources/static
        }).start(port);

        // __________________________________________________

        // Page Redirects
        app.get("/", ctx -> ctx.html(ThymeleafSetup.render("login.html", null)));
        app.get("/register", ctx -> ctx.html(ThymeleafSetup.render("register.html", null)));
        app.get("/worldmap", ctx -> ctx.html(ThymeleafSetup.render("index.html", null)));
        app.error(404, ctx -> ctx.html(ThymeleafSetup.render("404.html", null)));

        // __________________________________________________

        // System print
        System.out.println("http://localhost:" + port + " | I din URL bby girl");
    }

    // __________________________________________________

    public void stop() {
        if (app != null) {
            app.stop();
        }
    }

} // Server end
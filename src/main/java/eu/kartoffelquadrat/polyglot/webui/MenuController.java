package eu.kartoffelquadrat.polyglot.webui;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MenuController {

    // TODO: find out why the mapping does not work! => always maps to "http://127.0.0.1:8080/"
    @RequestMapping(method = RequestMethod.GET, value = "/polyglot/")
    public String index() {
        return "index.html";
    }
}

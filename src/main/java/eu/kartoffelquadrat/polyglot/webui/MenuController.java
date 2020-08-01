package eu.kartoffelquadrat.polyglot.webui;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(path = "/polyglot")
public class MenuController {

    @RequestMapping(method = RequestMethod.GET, value = "/menu")
    public String index() {
        return "index.html";
    }
}

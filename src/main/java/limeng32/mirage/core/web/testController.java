package limeng32.mirage.core.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/index")
public class testController {

	@RequestMapping()
	public String get() {
		System.out.println("1");
		return "index";
	}

}

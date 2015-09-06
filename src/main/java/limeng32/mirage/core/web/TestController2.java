package limeng32.mirage.core.web;

import java.util.List;

import limeng32.mirage.core.page.Page;
import limeng32.mirage.core.page.PageParam;
import limeng32.mirage.core.pojo.Book;
import limeng32.mirage.core.pojo.condition.BookCondition;
import limeng32.mirage.core.service.BookService;
import limeng32.mirage.core.service.WriterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/oa/demo/index")
public class TestController2 {

	@Autowired
	private BookService bookService;

	@Autowired
	private WriterService writerService;

	@RequestMapping(method = RequestMethod.GET)
	public String get() {
		return "/oa/demo/index";
	}

	@RequestMapping(value = "/testDemo")
	public String get(ModelMap mm, PageParam pageParam) {
		System.out.println("2");
		int pageNo = pageParam.getPageNo() > 0 ? pageParam.getPageNo() : 1;
		BookCondition bc = new BookCondition();
		bc.setLimiter(new PageParam(pageNo, 5));
		List<Book> ret = bookService.selectAll(bc);
		Page<Book> page = new Page<>(ret, bc.getLimiter());
		mm.addAttribute("_content", page);
		return "testController1";
	}

}

package limeng32.mirage.core.pojo.condition;

import limeng32.mirage.core.pojo.Book;
import limeng32.mybatisPlugin.mapperPlugin.annotation.ConditionMapperAnnotation;
import limeng32.mybatisPlugin.mapperPlugin.annotation.ConditionType;
import limeng32.mybatisPlugin.mapperPlugin.annotation.QueryMapperAnnotation;

@QueryMapperAnnotation(tableName = "Book")
public class BookCondition extends Book {

	private static final long serialVersionUID = 1L;

	@ConditionMapperAnnotation(dbFieldName = "title", conditionType = ConditionType.Like)
	private String titleLike;

	public String getTitleLike() {
		return titleLike;
	}

	public void setTitleLike(String titleLike) {
		this.titleLike = titleLike;
	}

}

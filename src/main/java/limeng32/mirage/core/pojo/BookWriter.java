package limeng32.mirage.core.pojo;

import java.io.Serializable;

import limeng32.mybatisPlugin.mapperPlugin.able.AbleConditionFlagAnnotation;
import limeng32.mybatisPlugin.mapperPlugin.able.AbleConditionType;
import limeng32.mybatisPlugin.mapperPlugin.able.AbleFlagAnnotation;
import limeng32.mybatisPlugin.mapperPlugin.able.PojoAble;
import limeng32.mybatisPlugin.mapperPlugin.annotation.FieldMapperAnnotation;
import limeng32.mybatisPlugin.mapperPlugin.annotation.PersistentFlagAnnotation;
import limeng32.mybatisPlugin.mapperPlugin.annotation.TableMapperAnnotation;

import org.apache.ibatis.type.JdbcType;

import com.alibaba.fastjson.annotation.JSONField;

@TableMapperAnnotation(tableName = "BookWriter")
public class BookWriter extends PojoSupport<BookWriter> implements
		Serializable, PojoAble {
	private static final long serialVersionUID = 1L;

	@JSONField(serialize = false)
	@FieldMapperAnnotation(dbFieldName = "id", jdbcType = JdbcType.INTEGER, isUniqueKey = true)
	private Integer id;

	@FieldMapperAnnotation(dbFieldName = "bookid", jdbcType = JdbcType.INTEGER, dbAssociationUniqueKey = "id")
	private Book book;

	@FieldMapperAnnotation(dbFieldName = "writerid", jdbcType = JdbcType.INTEGER, dbAssociationUniqueKey = "id")
	private Writer writer;

	public Book getBook() {
		return book;
	}

	public void setBook(Book newBook) {
		if (this.book == null || !this.book.equals(newBook)) {
			if (this.book != null) {
				Book oldBook = this.book;
				this.book = null;
				oldBook.removeBookWriter(this);
			}
			if (newBook != null) {
				this.book = newBook;
				this.book.addBookWriter(this);
			}
		}
	}

	public Writer getWriter() {
		return writer;
	}

	public void setWriter(Writer newWriter) {
		if (this.writer == null || !this.writer.equals(newWriter)) {
			if (this.writer != null) {
				Writer oldWriter = this.writer;
				this.writer = null;
				oldWriter.removeBookWriter(this);
			}
			if (newWriter != null) {
				this.writer = newWriter;
				this.writer.addBookWriter(this);
			}
		}
	}

	@Override
	public Integer getId() {
		return id;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	@PersistentFlagAnnotation
	private String _persistent;

	@Override
	public boolean isable() {
		return isable;
	}

	@AbleFlagAnnotation
	private boolean isable;

	@Override
	public void setAbleCondition(AbleConditionType ableCondition) {
		this.ableCondition = ableCondition;
	}

	@JSONField(serialize = false)
	@Override
	public AbleConditionType getAbleCondition() {
		return ableCondition;
	}

	@AbleConditionFlagAnnotation
	private AbleConditionType ableCondition;
}

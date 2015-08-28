package limeng32.mirage.core.pojo.condition;

import limeng32.mybatisPlugin.cachePlugin.Limitable;
import limeng32.mybatisPlugin.cachePlugin.Sortable;


public interface Conditionable {

	public Limitable getLimiter();

	public void setLimiter(Limitable limiter);

	public Sortable getSorter();

	public void setSorter(Sortable sorter);

	public String dot = ".";

	public enum Sequence {
		asc, desc
	}

}

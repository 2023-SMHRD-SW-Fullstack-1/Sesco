package com.smhrd.sesco.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.sesco.domain.Kid;

@Mapper
public interface KidMapper {

	@Select("select * from t_kid where user_id=#{user_id}")
	public ArrayList<Kid> getKidList(String user_id);

}
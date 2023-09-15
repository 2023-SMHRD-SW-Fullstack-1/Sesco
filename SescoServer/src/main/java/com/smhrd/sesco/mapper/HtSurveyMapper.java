package com.smhrd.sesco.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;

import com.google.gson.JsonObject;
import com.smhrd.sesco.domain.HtSurveyDetail;
import com.smhrd.sesco.domain.HtSurveyTip;
import com.smhrd.sesco.domain.Survey;

@Mapper
public interface HtSurveyMapper {

	// 해당 아이 생후 개월 수에 맞는 설문지 불러오기 
	@Select("select * from ht_survey_detail where hsv_seq=#{hsv_seq}")
	public List<HtSurveyDetail> viewSurveyAgeCheckList(HtSurveyDetail svDetail);

	// 해당 아이 생후 개월 수에 맞는 설문지 체크 후 불러올 육아팁 데이터
	@Select("select * from ht_survey_tip where hsv_seq=#{hsv_seq} ")
	public List<HtSurveyTip> viewSurveyAgeTip(HtSurveyTip svTip);

	public void saveResult(String seq);
	
	@Insert("INSERT INTO t_survey (sv_dt, hsv_seq, kid_seq) VALUES (NOW(), #{hsv_seq}, #{kid_seq})")
    @SelectKey(keyProperty = "sv_seq", resultType = Long.class, before = false, statement = "SELECT LAST_INSERT_ID() AS sv_seq")
    public void insertSurvey(Survey survey);

	public List<HtSurveyDetail> preSurveyList(String kidSeq, int hsvSeq);

	
	
}

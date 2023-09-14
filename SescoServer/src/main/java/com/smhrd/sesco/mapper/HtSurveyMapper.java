package com.smhrd.sesco.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.google.gson.JsonObject;
import com.smhrd.sesco.domain.HtSurveyDetail;
import com.smhrd.sesco.domain.HtSurveyTip;

@Mapper
public interface HtSurveyMapper {

	// 해당 아이 생후 개월 수에 맞는 설문지 불러오기 
	@Select("select * from ht_survey_detail where hsv_seq=#{hsv_seq}")
	public List<HtSurveyDetail> viewSurveyAgeCheckList(HtSurveyDetail svDetail);

	// 해당 아이 생후 개월 수에 맞는 설문지 체크 후 불러올 육아팁 데이터
	@Select("select * from ht_survey_tip where hsv_seq=#{hsv_seq} ")
	public List<HtSurveyTip> viewSurveyAgeTip(HtSurveyTip svTip);

	public void saveResult(String seq);

}

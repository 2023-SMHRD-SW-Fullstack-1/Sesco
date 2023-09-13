package com.smhrd.sesco.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.smhrd.sesco.domain.HtSurveyDetail;
import com.smhrd.sesco.domain.HtSurveyTip;
import com.smhrd.sesco.domain.SurveyDo;
import com.smhrd.sesco.service.HtSurveyService;

@RestController
@CrossOrigin("http://localhost:3000")
public class HtSurveyController {

	@Autowired
	private HtSurveyService htsurService;
	
	// 개월 별 체크리스트 문항리스트
	@PostMapping("/survey/agechecklist")
	public List<HtSurveyDetail> viewSurveyAgeCheckList(@RequestBody Map<String, Object> map) {
		int hsv_seq = Integer.parseInt(map.get("hsv_seq").toString());
		
		
		HtSurveyDetail svDetail = new HtSurveyDetail();
		svDetail.setHsv_seq(hsv_seq);
		
		
		return htsurService.viewSurveyDetail(svDetail);
	
	}
	
	// 체크리스트 개월 별 팁 출력
	@PostMapping("/survey/agetip")
	public List<HtSurveyTip> viewSurveyAgeTip(@RequestBody Map<String, Object> map) {
		int hsv_seq = Integer.parseInt(map.get("hsv_seq").toString());
		
		HtSurveyTip svTip = new HtSurveyTip();
		svTip.setHsv_seq(hsv_seq);
		
		return htsurService.viewSurveyAgeTip(svTip);
		
	
	}
	
	// 설문결과 저장리스트
	@PostMapping("/survey/saveresult")
	public void saveResult(@RequestBody Map<String,Object> map) {
		//1.

//		kid_seq => 
//		hsv_seq =>
//		surveyService.....
		
//		insert into t_survey (sv_dt, hsv_seq, kid_seq) values (now(), #{hsv_seq}, #{kid_seq})
		//seq
//		select sv_seq from t_survey where kid_seq=#{kid_seq} ORDER BY sv_dt DESC LIMIT 1;
		
//  	insert into t_survey_do (hsvd_seq, sv_seq) values(#{value}, #{sv_seq}) 
		
		//2.
		ArrayList<Object> list = new ArrayList<>();
		list.add(map);
		System.out.println("map : "+map);
		
		
		
		for (Object item : list) {
			
	        ArrayList<String> socialCheckList = (ArrayList<String>) ((Map<String, Object>) item).get("socialCheckList");
	        ArrayList<String> languageCheckList = (ArrayList<String>) ((Map<String, Object>) item).get("languageCheckList");
	        ArrayList<String> brainCheckList = (ArrayList<String>) ((Map<String, Object>) item).get("brainCheckList");
	        ArrayList<String> physicalCheckList = (ArrayList<String>) ((Map<String, Object>) item).get("physicalCheckList");
	        
	        System.out.println("소셜체크리스트 : " +socialCheckList);
	        
	        for (String seq : socialCheckList) {
	            SurveyDo entity = new SurveyDo();
	            entity.setHsvd_seq(seq);
	            htsurService.saveResult(seq);
	        }
	        
	        for (String seq : languageCheckList) {
	            SurveyDo entity = new SurveyDo();
	            entity.setHsvd_seq(seq);
	            htsurService.saveResult(seq);
	        }
	        
	        for (String seq : brainCheckList) {
	            SurveyDo entity = new SurveyDo();
	            entity.setHsvd_seq(seq);
	            htsurService.saveResult(seq);
	        }
	        
	        for (String seq : physicalCheckList) {
	            SurveyDo entity = new SurveyDo();
	            entity.setHsvd_seq(seq);
	            htsurService.saveResult(seq);
	        }
	        
	        // 데이터를 Map<String, ArrayList<String>> 형태로 구성
//	        Map<String, ArrayList<String>> resultMap = new HashMap<>();
//	        if (map.containsKey("socialCheckList")) {
//	            resultMap.put("socialCheckList", (ArrayList<String>) map.get("socialCheckList"));
//	        }
//
//	        if (map.containsKey("languageCheckList")) {
//	            resultMap.put("languageCheckList", (ArrayList<String>) map.get("languageCheckList"));
//	        }
//
//	        if (map.containsKey("brainCheckList")) {
//	            resultMap.put("brainCheckList", (ArrayList<String>) map.get("brainCheckList"));
//	        }
//
//	        if (map.containsKey("physicalCheckList")) {
//	            resultMap.put("physicalCheckList", (ArrayList<String>) map.get("physicalCheckList"));
//	        }
	        
	        // 서비스로 데이터 전달
	        
	        
        }
		
		
	}
	
	
	
}

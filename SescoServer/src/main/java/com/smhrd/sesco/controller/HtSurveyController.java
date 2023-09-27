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
import com.smhrd.sesco.domain.HtSurveyDetail;
import com.smhrd.sesco.domain.HtSurveyTip;
import com.smhrd.sesco.domain.Survey;
import com.smhrd.sesco.domain.SurveyDo;
import com.smhrd.sesco.service.HtSurveyService;
import com.smhrd.sesco.service.SurveyService;


@RestController
@CrossOrigin("http://localhost:3000")
public class HtSurveyController {

	
	@Autowired
	private HtSurveyService htsurService;

	@Autowired
    private SurveyService surveyService;

	
	// 개월 별 체크리스트 문항리스트
	@PostMapping("/survey/agechecklist")
	public List<HtSurveyDetail> viewSurveyAgeCheckList(@RequestBody Map<String, Object> map) {
		int hsv_seq = Integer.parseInt(map.get("hsv_seq").toString());

		HtSurveyDetail svDetail = new HtSurveyDetail();
		svDetail.setHsv_seq(hsv_seq);

		return htsurService.viewSurveyAgeCheckList(svDetail);

	}

	// 체크리스트 개월 별 팁 출력
	@PostMapping("/survey/agetip")
	public List<HtSurveyTip> viewSurveyAgeTip(@RequestBody Map<String, Object> map) {
		int hsv_seq = Integer.parseInt(map.get("hsv_seq").toString());

		HtSurveyTip svTip = new HtSurveyTip();
		svTip.setHsv_seq(hsv_seq);

		return htsurService.viewSurveyAgeTip(svTip);

	}
	
	//설문결과 저장리스트
	 @PostMapping("/survey/saveresult")
	    public void saveResult(@RequestBody Map<String, Object> map) {
	        List<String> totalCheckList = (List<String>) map.get("totalCheckList");
	        String kidSeq = map.get("kid_seq").toString();
	        int hsvSeq = Integer.parseInt(map.get("hsv_seq").toString());
	        
	        Survey survey = new Survey();
	        survey.setTotalCheckList(totalCheckList);
	        survey.setKid_seq(kidSeq);
	        survey.setHsv_seq(hsvSeq);

	        surveyService.saveSurvey(survey);
	        
	    }
	 
	 // 이전설문 불러오기
	 @PostMapping("/survey/presurveylist")
	 public List<HtSurveyDetail> preSurveyList(@RequestBody Map<String,Object> map){
		 System.out.println("preSurveyList : "+map);
		 
		 String kidSeq = map.get("kid_seq").toString();
		 int hsvSeq = Integer.parseInt(map.get("hsv_seq").toString());
		 
		 
		 List<HtSurveyDetail> presurveylist = new ArrayList<HtSurveyDetail>();
		 presurveylist.addAll(htsurService.preSurveyList(kidSeq,hsvSeq));
		
		
		 return presurveylist;
	 }
	 
	 
	
	
	
	
	
	
	
	
	
	
	

}

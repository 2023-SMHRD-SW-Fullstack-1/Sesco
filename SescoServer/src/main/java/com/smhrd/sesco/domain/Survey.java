package com.smhrd.sesco.domain;

import java.util.List;

public class Survey {
	private String sv_seq;
    private List<String> totalCheckList;
    private String kid_seq;
    private int hsv_seq;

    // Getter와 Setter 메서드
    public String getSv_seq() {
        return sv_seq;
    }

    public void setSv_seq(String sv_seq) {
        this.sv_seq = sv_seq;
    }

    public List<String> getTotalCheckList() {
        return totalCheckList;
    }

    public void setTotalCheckList(List<String> totalCheckList) {
        this.totalCheckList = totalCheckList;
    }

    public String getKid_seq() {
        return kid_seq;
    }

    public void setKid_seq(String kid_seq) {
        this.kid_seq = kid_seq;
    }

    public int getHsv_seq() {
        return hsv_seq;
    }

    public void setHsv_seq(int hsv_seq) {
        this.hsv_seq = hsv_seq;
    }
}

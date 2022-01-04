
let a={
vod_id: '5224',
type_id: '3',
type_id_1: '0',
group_id: '0',
vod_name: '心动的信号 第四季',
vod_sub: '',
vod_en: 'xindongdexinhaodisiji',
vod_status: '1',
vod_letter: 'X',
vod_color: '',
vod_tag: '心动的信号 第四季,社交,推理,四季,节目,不同,信号',
vod_class: '综艺',
vod_pic: 'upload/vod/20211210-1/8c8d6f40d3690ae526e16a26f67b0c5e.jpg',
vod_pic_thumb: '',
vod_pic_slide: '',
vod_pic_screenshot: '',
vod_actor: '杜海涛,郭麒麟,宋祖儿,李雪琴,马伯骞,Angelababy,赵琦君,杨凯雯,宣璐,金靖,毛不易',
vod_director: '腾讯综艺台',
vod_writer: '',
vod_behind: '',
vod_blurb: '心动的信号第4季，高甜恋综回归，即将播出……',
vod_remarks: '20210826期',
vod_pubdate: '',
vod_total: '0',
vod_serial: '0',
vod_tv: '',
vod_weekday: '0',
vod_area: '大陆',
vod_lang: '',
vod_year: '2021',
vod_version: '',
vod_state: '',
vod_author: '',
vod_jumpurl: '',
vod_tpl: '',
vod_tpl_play: '',
vod_tpl_down: '',
vod_isend: '0',
vod_lock: '0',
vod_level: '0',
vod_copyright: '0',
vod_points: '0',
vod_points_play: '0',
vod_points_down: '0',
vod_hits: '143',
vod_hits_day: '482',
vod_hits_week: '773',
vod_hits_month: '640',
vod_duration: '',
vod_up: '12',
vod_down: '97',
vod_score: '6',
vod_score_all: '1206',
vod_score_num: '201',
vod_time: '1639126793',
vod_time_add: '1639113892',
vod_time_hits: '0',
vod_time_make: '0',
vod_trysee: '0',
vod_douban_id: '0',
vod_douban_score: '0',
vod_reurl: 'https://www.360kan.com/va/Y8QqbHNz8ZQ3ET.html',
vod_rel_vod: '',
vod_rel_art: '',
vod_pwd: '',
vod_pwd_url: '',
vod_pwd_play: '',
vod_pwd_play_url: '',
vod_pwd_down: '',
vod_pwd_down_url: '',
vod_content: '心动的信号第4季，高甜恋综回归，即将播出……',
vod_play_from: 'qq',
vod_play_server: '',
vod_play_note: '',
vod_play_url:'url',
vod_down_from: '',
vod_down_server: '',
vod_down_note: '',
vod_down_url: '',
vod_plot: '0',
vod_plot_name: '',
vod_plot_detail: ''
}

function sqlAdd(val){
    let Defaultsql={};
    for (let key in val) {
        if(val[key]==''){
            Defaultsql[key]='';
        }else if(val[key]=='0'){
            Defaultsql[key]=val[key];
        }else{
            Defaultsql[key]='';
        }
        
    }
    return Defaultsql;

 }
 console.log("sqlAdd：",sqlAdd(a));

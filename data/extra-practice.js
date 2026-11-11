'use strict';

const buCuratedPracticeLessons = new Set(['g10-b7','g10-b8','g10-b9','g10-b10','g10-b11']);

const buPracticeAdditions = (() => {
  const byChapter={};
  const vector=text=>String(text).replace(/→([A-Z][A-Z′]|[a-z])/gu,'\\vec{$1}');
  function add(chapterId,lessonId,questions) {
    const entries=byChapter[chapterId]||=[];
    for(const [index,question] of questions.entries()){
      const id=lessonId+'-practice-v1-'+(index+1);
      const q={id,chapterId,lessonId,reviewed:true,...question};
      if(q.type==='mcq'){
        const offset=[...id].reduce((sum,char)=>sum+char.charCodeAt(0),0)%4;
        q.options=[...q.options.slice(4-offset),...q.options.slice(0,4-offset)];
        q.answer=offset;
      }
      entries.push(q);
    }
  }
  const mc=(prompt,options,explanation,level='apply',figure)=>({
    type:'mcq',prompt:vector(prompt),options:options.map(vector),explanation:vector(explanation),tags:[level],figure
  });
  const sa=(prompt,answer,explanation,level='apply',figure)=>({
    type:'short',prompt:vector(prompt),answer,explanation:vector(explanation),tags:[level],figure
  });
  const tf=(prompt,items,level='apply',figure)=>({
    type:'tf',prompt:vector(prompt),tags:[level],figure,
    explanation:'Đối chiếu điều kiện và lời giải của từng ý.',
    statements:items.map(([text,answer,explanation])=>({text:vector(text),answer,explanation:vector(explanation)}))
  });
  const v=(n,questions)=>add('g10-c4','g10-b'+n,questions);
  v(7,[
    mc('Vectơ →AB có điểm đầu và điểm cuối theo thứ tự nào?',['A và B','B và A','A và A','B và B'],'Thứ tự tên điểm chính là thứ tự điểm đầu rồi điểm cuối.','recognize'),
    mc('Cho A ≠ B. Giá của vectơ →AB là gì?',['Đường thẳng AB','Đoạn thẳng AB','Tia BA','Độ dài AB'],'Giá của một vectơ khác vectơ-không là đường thẳng đi qua điểm đầu và điểm cuối.','recognize'),
    mc('Hai vectơ khác vectơ-không có giá song song. Điều gì chắc chắn đúng?',['Chúng cùng phương','Chúng cùng hướng','Chúng bằng nhau','Chúng đối nhau'],'Cùng phương cho phép cả cùng hướng và ngược hướng.','trap'),
    mc('Trong hình bình hành ABCD, vectơ nào bằng →AB?',['→DC','→CD','→AD','→BC'],'→AB và →DC cùng hướng và cùng độ dài. →CD có chiều ngược lại.','trap'),
    mc('Hai vectơ khác vectơ-không bằng nhau khi nào?',['Cùng hướng và cùng độ dài','Cùng phương và cùng độ dài','Cùng hướng hoặc cùng độ dài','Có chung điểm đầu'],'Cần đồng thời cùng hướng và cùng độ dài. Cùng phương chưa đủ để xác định hướng.','recognize'),
    mc('Ba điểm A, B, C nằm theo thứ tự đó trên một đường thẳng. Cặp nào ngược hướng?',['→AB và →CB','→AB và →BC','→BA và →CB','→AC và →BC'],'→AB hướng về phía C. →CB đi theo chiều ngược lại.','apply'),
    mc('Hai ô tô cùng chạy 40 km/h trên một đường thẳng, một xe đi về phía bắc và một xe về phía nam. Hai vectơ vận tốc thế nào?',['Cùng phương, ngược hướng và bằng nhau về độ dài','Bằng nhau vì cùng tốc độ','Khác phương vì đi hai chiều','Cùng hướng nhưng có độ dài khác nhau'],'Tốc độ là độ dài vectơ vận tốc. Hai xe cùng phương nhưng chạy theo hai hướng đối nhau.','trap'),
    mc('Cho M là trung điểm của đoạn AB. Đẳng thức nào đúng?',['→AM = →MB','→MA = →MB','→AM = →BM','→AB = →MB'],'→AM và →MB cùng hướng từ A đến B và có độ dài bằng nhau.','apply'),
    mc('Nếu →AB bằng vectơ-không thì điều gì phải xảy ra?',['A trùng B','A và B cách nhau 1 đơn vị','A và B đối xứng qua một điểm khác chúng','Giá của →AB luôn là trục Ox'],'Vectơ-không có độ dài 0 nên điểm đầu và điểm cuối trùng nhau.','recognize'),
    mc('Hai vectơ cùng độ dài nhưng nằm trên hai đường thẳng cắt nhau tạo góc 30°. Kết luận nào đúng?',['Chúng khác phương','Chúng bằng nhau','Chúng ngược hướng','Chúng cùng phương'],'Hai giá cắt nhau tại một điểm và không trùng nhau nên không cùng phương.','trap'),
    sa('Cho 4 điểm phân biệt. Lập các vectơ khác vectơ-không có điểm đầu và điểm cuối chọn từ 4 điểm đó. Có bao nhiêu cặp điểm đầu–điểm cuối có thứ tự?',12,'Chọn điểm đầu theo 4 cách. Sau đó còn 3 cách chọn điểm cuối, được 4 × 3 = 12.'),
    sa('B nằm giữa A và C. Biết →AB và →BC bằng nhau, AC dài 18 cm. Tính độ dài →CB theo cm.',9,'AB = BC và AC = AB + BC, nên BC = 9 cm. →CB có độ dài BC.'),
    sa('Cho hình bình hành ABCD với AB = 7 cm, BC = 4 cm. Trong 8 vectơ tạo bởi hai chiều của bốn cạnh, có bao nhiêu vectơ bằng →AD?',2,'→AD và →BC cùng hướng, cùng độ dài. Hai vectơ ngược chiều là →DA và →CB.'),
    tf('Hình chữ nhật ABCD có AB = 8 cm và AD = 3 cm.',[
      ['Giá của →AB là đường thẳng AB.',true,'Đường thẳng qua A và B là giá của →AB.'],
      ['→AB và →CD cùng hướng.',false,'Chúng đi theo hai chiều ngược nhau.'],
      ['→DA bằng →CB.',true,'Cùng chiều và cùng độ dài trên hai cạnh đối.'],
      ['→BC có độ dài 8 cm.',false,'BC = AD = 3 cm.']
    ]),
    tf('Bốn điểm A, B, C, D nằm theo thứ tự đó trên một đường thẳng với AB = 2 cm, BC = 3 cm, CD = 2 cm.',[
      ['→AB = →CD.',true,'Hai vectơ cùng hướng và đều dài 2 cm.'],
      ['→BD có độ dài 5 cm.',true,'BD = BC + CD = 5 cm.'],
      ['→CA và →BD cùng hướng.',false,'→CA hướng về A, →BD hướng về D.'],
      ['Giá của →AC và →BD là hai đường thẳng phân biệt.',false,'Hai giá trùng nhau vì cả bốn điểm thẳng hàng.']
    ],'trap')
  ]);
  v(8,[
    mc('Theo quy tắc ba điểm, →PQ + →QR bằng vectơ nào?',['→PR','→RP','→QP','→RQ'],'Đi từ P đến Q rồi đến R, nên vectơ tổng đi từ P đến R.','recognize'),
    mc('Hai vectơ có chung điểm đầu O. Hiệu →OB − →OA bằng gì?',['→AB','→BA','→OA','→BO'],'→OA + →AB = →OB nên →OB − →OA = →AB.','trap'),
    mc('Trong hình bình hành ABCD, →AB + →AD bằng gì?',['→AC','→CA','→BD','→DB'],'Quy tắc hình bình hành cho vectơ tổng là đường chéo xuất phát từ A.','recognize'),
    mc('Tính tổng →AB + →BC + →CD + →DA.',['Vectơ-không','→AC','→AD','→DB'],'Đường đi khép kín quay lại A nên tổng là →AA.','apply'),
    mc('Nếu →u + →v = vectơ-không và →u khác vectơ-không, kết luận nào đúng?',['→v đối với →u','→v bằng →u','→v vuông góc →u','→v là vectơ-không'],'Tổng bằng vectơ-không khi hai vectơ đối nhau.','recognize'),
    mc('M là trung điểm AB. Với điểm P bất kỳ, biểu thức →PA + →PB bằng gì?',['2→PM','→AB','Vectơ-không','→MP'],'Tách thành 2→PM + →MA + →MB. Hai vectơ cuối đối nhau.','apply'),
    mc('G là trọng tâm tam giác ABC. Tổng →GA + →GB + →GC bằng gì?',['Vectơ-không','→AG','→BC','→CG'],'Gọi M là trung điểm BC. Tổng bằng →GA + 2→GM, bằng vectơ-không.','apply'),
    mc('Trong hình bình hành ABCD, hiệu →AB − →AD bằng gì?',['→DB','→BD','→AC','→CA'],'Dùng quy tắc hiệu hai vectơ có chung điểm đầu A.','trap'),
    mc('Hai lực 3 N và 4 N có cùng phương, ngược hướng và cùng tác dụng vào một điểm. Hợp lực có độ lớn nào?',['1 N','7 N','5 N','12 N'],'Khi ngược hướng, độ lớn hợp lực bằng hiệu hai độ lớn.','apply'),
    sa('Hai lực vuông góc có độ lớn 9 N và 12 N. Tìm độ lớn hợp lực theo N.',15,'Đường chéo hình chữ nhật biểu diễn hợp lực có độ dài √(9² + 12²) = 15.'),
    sa('Trong tam giác ABC, AB = 6 cm, AC = 8 cm, BC = 10 cm. Tính độ dài →AC − →AB theo cm.',10,'→AC − →AB = →BC, nên độ dài bằng BC.','trap'),
    sa('Một người đi 16 m về đông, 9 m về bắc rồi 4 m về tây. Tính độ dài vectơ dịch chuyển theo mét.',15,'Dịch chuyển còn 12 m về đông và 9 m về bắc. Độ dài là √(12² + 9²) = 15.'),
    sa('Gọi M là trung điểm AB. Nếu |→PA + →PB| = 14 thì PM bằng bao nhiêu?',7,'Tổng hai vectơ bằng 2→PM, có độ dài 2PM.'),
    tf('Cho tam giác ABC và đặt →u = →AB, →v = →AC.',[
      ['→BC = →v − →u.',true,'Dùng quy tắc hiệu với điểm đầu A.'],
      ['→CA + →AB = →CB.',true,'Đi từ C qua A tới B.'],
      ['→AB + →BC = →CA.',false,'Tổng đúng là →AC.'],
      ['→u − →v bằng →BC.',false,'Hiệu này là →CB.']
    ],'trap'),
    tf('Một robot đi 5 m về đông, 12 m về bắc rồi quay thẳng về điểm xuất phát.',[
      ['Hai vectơ dịch chuyển đầu vuông góc.',true,'Hướng đông và hướng bắc vuông góc.'],
      ['Trước khi quay về, robot cách điểm xuất phát 17 m.',false,'Khoảng cách là √(5² + 12²) = 13 m.'],
      ['Quãng đường của hành trình là 30 m.',true,'Robot đi 5 + 12 + 13 = 30 m.'],
      ['Tổng ba vectơ dịch chuyển là vectơ-không.',true,'Vị trí cuối trùng vị trí đầu.']
    ])
  ]);
  v(9,[
    mc('Với →u khác vectơ-không, vectơ −3→u có hướng nào?',['Ngược hướng với →u','Cùng hướng với →u','Vuông góc với →u','Không cùng phương với →u'],'Hệ số âm làm đảo chiều vectơ.','recognize'),
    mc('Cho |→u| = 5. Tính |−2→u|.',['10','−10','3','7'],'Độ dài được nhân với giá trị tuyệt đối của hệ số, tức 2 × 5.','trap'),
    mc('Điểm M nằm giữa A và B, AM = 3MB. Biểu thức nào đúng?',['→AM = (3/4)→AB','→AM = (1/3)→AB','→AM = 3→AB','→AM = −(3/4)→AB'],'AB gồm 4 phần bằng nhau, AM chiếm 3 phần và cùng hướng →AB.','apply'),
    mc('Hai vectơ khác vectơ-không →u, →v cùng phương khi nào?',['Tồn tại số k sao cho →u = k→v','Chỉ khi →u = →v','Chỉ khi →u = −→v','Khi tổng của chúng bằng 0 trong mọi trường hợp'],'Có thể dùng cả hệ số dương và âm. Không cần hai vectơ có cùng độ dài.','recognize'),
    mc('Cho A ≠ B và →AC = −2→AB. Điểm nào nằm giữa hai điểm còn lại?',['A','B','C','Không có điểm nào'],'Từ A, các hướng đi tới C và B ngược nhau nên A nằm giữa B và C.','trap'),
    mc('Trong tam giác ABC, M là trung điểm BC. Vectơ →AM bằng biểu thức nào?',['(1/2)→AB + (1/2)→AC','→AB + →AC','(1/2)→AB − (1/2)→AC','→AB + (1/2)→AC'],'Lấy trung bình hai vectơ xuất phát từ A tới B và C.','apply'),
    mc('Cho O là điểm cố định và →OA, →OB không cùng phương. Nếu →OM = 2→OA − →OB thì điểm nào là trung điểm của BM?',['A','O','B','M'],'Ta có →OB + →OM = 2→OA. Đó là hệ thức trung điểm.','apply'),
    mc('Nếu 3→u = vectơ-không thì →u có thể là vectơ khác vectơ-không hay không?',['Không, vì nhân hai vế với 1/3 được →u bằng vectơ-không','Có, nếu →u có hướng âm','Có, nếu →u có độ dài 3','Có, vì mọi tích vectơ đều bằng 0'],'Hệ số 3 khác 0 nên phép nhân không biến một vectơ khác 0 thành vectơ-không.','recognize'),
    mc('Tam giác ABC có trọng tâm G và trung tuyến AM. Đẳng thức nào đúng?',['→GA = −2→GM','→GA = 2→GM','→AG = −2→GM','→GM = −2→GA'],'G nằm giữa A và M. GA dài gấp đôi GM, hai hướng từ G đối nhau.','trap'),
    sa('Cho A ≠ B, AB = 6 cm và →AM = −(3/2)→AB. Tính BM theo cm.',15,'A nằm giữa M và B. AM = 9 cm, vậy BM = 9 + 6 = 15 cm.'),
    sa('Hai vật khối lượng 3 kg và 5 kg đặt tại A và B, cách nhau 24 cm. Điểm cân bằng M giữa A và B thỏa 3MA = 5MB. Tính AM theo cm.',15,'AM:MB = 5:3 và AM + MB = 24. Do đó AM = 15 cm.'),
    sa('Cho →u, →v không cùng phương và 2→u + 3→v = m→u + (n − 1)→v. Tính m + n.',6,'So sánh hệ số theo từng vectơ được m = 2, n − 1 = 3.'),
    sa('Cho hình bình hành ABCD với AB = 9 cm. Nếu →AE = 2→AB thì BE dài bao nhiêu cm?',9,'E nằm trên tia AB và AE = 18 cm. BE = 18 − 9 = 9 cm.'),
    tf('Cho A ≠ B và điểm P thỏa →AP = (3/2)→AB.',[
      ['P thuộc tia AB.',true,'Hệ số nhân dương.'],
      ['P nằm giữa A và B.',false,'AP = 1,5AB nên P nằm ngoài đoạn AB.'],
      ['→BP = (1/2)→AB.',true,'→BP = →AP − →AB.'],
      ['→PA và →BP cùng hướng.',false,'→PA hướng về A, còn →BP hướng ra xa A.']
    ],'trap'),
    tf('Trong tam giác ABC, M là trung điểm BC và G là trọng tâm.',[
      ['→AM = (1/2)(→AB + →AC).',true,'Dùng quy tắc trung điểm với gốc A.'],
      ['→AG = (2/3)→AM.',true,'G nằm cách A hai phần ba trung tuyến.'],
      ['→GM = (2/3)→AM.',false,'GM chỉ bằng một phần ba AM.'],
      ['→GA = −(2/3)→AM.',true,'Đổi chiều của →AG.']
    ])
  ]);
  v(10,[
    mc('Cho A(1; 1) và B(4; 3). Tìm tọa độ →AB.',['(3; 2)','(−3; −2)','(5; 4)','(4; 3)'],'Lấy tọa độ B trừ tọa độ A theo từng thành phần.','recognize',{type:'study',id:'vectorCoordinates'}),
    mc('Cho →u = 2→i − 3→j trong hệ trục Oxy. Tọa độ của →u là gì?',['(2; −3)','(−3; 2)','(2; 3)','(−2; 3)'],'Hệ số của vectơ đơn vị →i là hoành độ, hệ số của →j là tung độ.','recognize'),
    mc('Biết A(−2; 4) và →AB = (5; −3). Tìm B.',['(3; 1)','(7; −7)','(−7; 7)','(3; 7)'],'Cộng độ dịch chuyển vào tọa độ điểm đầu: B(−2 + 5; 4 − 3).','trap'),
    mc('Hai vectơ nào cùng phương?',['(2; −3) và (−4; 6)','(2; 3) và (3; 2)','(0; 2) và (2; 0)','(1; 2) và (−1; 2)'],'(−4; 6) = −2(2; −3).','apply'),
    mc('Độ dài vectơ (−5; 12) bằng bao nhiêu?',['13','17','7','169'],'Độ dài là √((−5)² + 12²) = 13.','recognize'),
    mc('A(1; −3), B(5; 7). Trung điểm AB là điểm nào?',['(3; 2)','(4; 10)','(6; 4)','(2; 5)'],'Lấy trung bình hai hoành độ và trung bình hai tung độ.','apply'),
    mc('Tam giác có A(0; 0), B(6; 0), C(0; 9). Tọa độ trọng tâm là gì?',['(2; 3)','(3; 4,5)','(6; 9)','(3; 2)'],'Cộng tọa độ ba đỉnh rồi chia cho 3.','apply'),
    mc('Trong Oxy, tọa độ của vectơ khác vectơ-không song song với Oy có dạng nào?',['(0; b) với b ≠ 0','(a; 0) với a ≠ 0','(a; a) với a ≠ 0','(0; 0)'],'Chuyển động song song Oy chỉ làm thay đổi tung độ.','trap'),
    mc('Cho →u = (1; 4), →v = (2; −1). Tìm tọa độ 2→u − →v.',['(0; 9)','(0; 7)','(4; 7)','(4; 9)'],'Lấy (2; 8) trừ (2; −1), được (0; 9).','apply'),
    sa('Cho A(2; 1), B(5; 7), C(m; 9). Tìm m để A, B, C thẳng hàng.',6,'→AB = (3; 6) và →AC = (m − 2; 8). Tỉ số tung độ là 4/3, nên m − 2 = 4.'),
    sa('Cho hình bình hành ABCD với A(1; 2), B(4; 1), C(7; 5). Tính tung độ của D.',6,'D = A + C − B theo từng tọa độ, nên tung độ là 2 + 5 − 1.'),
    sa('Trong Oxy, khoảng cách giữa M(−4; 2) và N(2; 10) bằng bao nhiêu?',10,'→MN = (6; 8). Độ dài bằng √(36 + 64) = 10.'),
    sa('Hai vectơ →u = (m; 2) và →v = (8; 4) cùng hướng. Tìm m nếu chúng cùng phương.',4,'Thành phần thứ hai cho →u = (1/2)→v. Vậy m = 4.'),
    tf('Cho A(2; −1), B(−2; 2) và M là trung điểm AB.',[
      ['→AB có tọa độ (−4; 3).',true,'Lấy tọa độ B trừ tọa độ A.'],
      ['AB có độ dài 7.',false,'Độ dài là √(16 + 9) = 5.'],
      ['M nằm trên trục Oy.',true,'Hoành độ trung điểm bằng 0.'],
      ['→AM và →MB ngược hướng.',false,'Hai vectơ cùng chiều từ A về B.']
    ]),
    tf('Trong Oxy, cho →u = (6; −3), →v = (−2; 1) và →w = (0; 4).',[
      ['→u = −3→v.',true,'Nhân từng thành phần của →v với −3.'],
      ['→u và →v cùng hướng.',false,'Hệ số −3 cho hai hướng ngược nhau.'],
      ['→w cùng phương với trục Oy.',true,'Hoành độ của →w bằng 0.'],
      ['→u + →w có tung độ −7.',false,'Tung độ của tổng là −3 + 4 = 1.']
    ],'trap')
  ]);
  v(11,[
    mc('Nếu →u và →v khác vectơ-không và tạo góc tù, tích vô hướng có dấu gì?',['Âm','Dương','Bằng 0','Tùy độ dài'],'Cosin của góc tù âm, còn hai độ dài dương.','recognize'),
    mc('Cho |→u| = 7. Tích →u·→u bằng bao nhiêu?',['49','7','0','14'],'Góc giữa hai vectơ trùng hướng là 0°, nên tích bằng bình phương độ dài.','recognize'),
    mc('Tính tích vô hướng của (3; −4) và (−2; 5).',['−26','14','26','−2'],'Nhân các thành phần tương ứng rồi cộng: 3(−2) + (−4)5 = −26.','apply'),
    mc('Hai vectơ khác vectơ-không có tích vô hướng bằng 0. Góc giữa chúng bằng bao nhiêu?',['90°','0°','45°','180°'],'Khi hai độ dài dương, tích bằng 0 tương đương cosin của góc bằng 0.','recognize'),
    mc('Tam giác ABC đều. Góc giữa →AB và →BC bằng bao nhiêu?',['120°','60°','30°','180°'],'Góc ABC là góc giữa →BA và →BC. Đổi chiều →BA thành →AB cho góc bù 120°.','trap'),
    mc('Cho |→u| = 3, |→v| = 4 và →u·→v = 6. Góc giữa hai vectơ là bao nhiêu?',['60°','30°','90°','120°'],'Cosin của góc là 6/(3 × 4) = 1/2.','apply'),
    mc('Cho →u và →v khác vectơ-không. Nếu →u·→v < 0 thì (−→u)·→v thế nào?',['Dương','Âm','Luôn bằng 0','Không xác định'],'Đổi chiều một vectơ làm đổi dấu của tích vô hướng.','trap'),
    mc('Biểu thức (→u + →v)·(→u − →v) rút gọn bằng gì?',['|→u|² − |→v|²','|→u|² + |→v|²','2→u·→v','|→u − →v|²'],'Khai triển và dùng tính giao hoán của tích vô hướng để triệt tiêu hai tích chéo.','apply'),
    mc('Một lực không đổi vuông góc với vectơ dịch chuyển. Công của lực bằng bao nhiêu?',['0','Bằng độ lớn của lực','Bằng độ dài dịch chuyển','Bằng tích hai độ lớn'],'Công bằng tích vô hướng giữa lực và dịch chuyển. Góc 90° có cosin bằng 0.','apply'),
    sa('Tìm m để hai vectơ (m; 4) và (2; −3) vuông góc.',6,'Tích vô hướng bằng 2m − 12. Đặt bằng 0 thì m = 6.'),
    sa('Tam giác ABC đều cạnh 6 cm. Tính →AB·→AC.',18,'Hai vectơ chung điểm đầu A, góc bằng 60°. Tích là 6 × 6 × cos 60° = 18.'),
    sa('Lực có độ lớn 20 N tạo góc 60° với hướng dịch chuyển. Vật đi được 3 m theo hướng đó. Tính công theo J.',30,'Công bằng 20 × 3 × cos 60° = 30 J.'),
    sa('Cho |→u| = 5, |→v| = 2 và →u·→v = 3. Tính |→u − →v|².',23,'Bình phương độ dài hiệu bằng 25 + 4 − 2 × 3 = 23.','trap'),
    tf('Trong Oxy, cho →u = (4; 3) và →v = (−3; 4).',[
      ['→u và →v đều có độ dài 5.',true,'Cả hai có tổng bình phương tọa độ bằng 25.'],
      ['→u·→v = 0.',true,'4 × (−3) + 3 × 4 = 0.'],
      ['→u và →v ngược hướng.',false,'Tích vô hướng bằng 0 và cả hai đều khác vectơ-không nên chúng vuông góc.'],
      ['→u + →v vuông góc →u − →v.',true,'Tích vô hướng của tổng và hiệu bằng 25 − 25 = 0.']
    ]),
    tf('Tam giác ABC đều cạnh 4 cm. Gọi M là trung điểm của BC.',[
      ['Góc giữa →AB và →AC bằng 60°.',true,'Đó là góc tại đỉnh A.'],
      ['→AB·→BC = 8.',false,'Góc giữa hai vectơ là 120° nên tích bằng −8.'],
      ['→AM·→BC = 0.',true,'Trung tuyến AM đồng thời là đường cao.'],
      ['Tích →BA·→CA bằng 8.',true,'Đổi chiều cả hai vectơ không làm đổi tích.']
    ],'trap')
  ]);

  const a=(chapter,lesson,...questions)=>add(chapter,lesson,questions);
  a('g1-c1','g1-b1',
    mc('Trong rổ không còn quả cam nào. Số nào chỉ số cam trong rổ?',['0','1','2','5'],'Không có quả nào thì viết số 0.','recognize'),
    mc('Lấy 3 bông hoa. Dãy nào đọc đúng khi đếm từng bông?',['1, 2, 3','0, 1, 2','1, 2, 4','2, 3, 4'],'Bông đầu tiên ứng với số 1, bông thứ hai ứng với số 2.','recognize'),
    sa('Sau khi đếm mỗi que tính một lần, tiếng đếm cuối là “năm”. Có bao nhiêu que tính?',5,'Số đếm cuối cho biết có 5 que tính.'),
    mc('Bé đếm 4 hòn sỏi rồi xếp lại thành một vòng tròn. Số hòn sỏi bây giờ là bao nhiêu?',['4','0','3','5'],'Đổi cách xếp không đổi số hòn sỏi.'));
  a('g1-c2','g1-b7',
    mc('Mặt đồng hồ tròn giống hình nào?',['Hình tròn','Hình vuông','Hình tam giác','Hình chữ nhật'],'Mặt đồng hồ tròn có đường bao cong, không có góc.','recognize'),
    mc('Hình nào có đúng ba cạnh thẳng?',['Hình tam giác','Hình tròn','Hình vuông','Hình chữ nhật'],'Hình tam giác có ba cạnh.','recognize'),
    mc('Lật một miếng bìa hình vuông rồi đặt nghiêng. Miếng bìa vẫn có dạng gì?',['Hình vuông','Hình tam giác','Hình tròn','Hình chữ nhật dài'],'Đặt nghiêng chỉ thay đổi hướng của miếng bìa.','trap'),
    mc('Hình nào có đường bao cong và không có đỉnh?',['Hình tròn','Hình vuông','Hình tam giác','Hình chữ nhật'],'Đường bao hình tròn không có góc nhọn hay đỉnh.','recognize'),
    sa('Hình tam giác có mấy đỉnh?',3,'Ba chỗ gặp nhau của các cạnh là ba đỉnh.','recognize'),
    sa('Bé lần lượt chạm vào mỗi góc của một tờ giấy hình chữ nhật. Bé chạm mấy lần?',4,'Hình chữ nhật có 4 góc.'),
    mc('Khung ảnh có bốn cạnh bằng nhau và bốn góc giống góc tờ giấy. Khung có dạng gì?',['Hình vuông','Hình tròn','Hình tam giác','Hình chữ nhật dài'],'Bốn cạnh bằng nhau và bốn góc vuông tạo hình vuông.','apply'),
    mc('Vật nào dưới đây có mặt trước dạng hình chữ nhật dài?',['Màn hình tivi chữ nhật','Đồng xu tròn','Biển báo tam giác','Quả bóng tròn'],'Mặt màn hình chữ nhật có hai cạnh dài và hai cạnh ngắn.'),
    mc('Miếng bìa có hình gì?',['Hình tam giác','Hình vuông','Hình chữ nhật','Hình tròn'],'Miếng bìa có ba cạnh và ba đỉnh.','recognize',{type:'shape',shape:'triangle',variant:0}),
    mc('Hình tô màu có dạng nào?',['Hình tròn','Hình chữ nhật','Hình tam giác','Hình vuông'],'Đường bao cong kín của hình không có đỉnh.','recognize',{type:'shape',shape:'circle',variant:0}));
  a('g1-c2','g1-b8',
    mc('Cắt một miếng bìa hình vuông theo đường nối hai góc đối diện. Hai mảnh thu được có dạng gì?',['Hai hình tam giác','Hai hình tròn','Hai hình vuông','Hai hình chữ nhật'],'Đường cắt tạo hai mảnh có ba cạnh.'),
    sa('Có 6 que giống nhau. Dùng 3 que cho mỗi hình tam giác riêng. Ghép được mấy hình?',2,'Chia 6 que thành hai nhóm, mỗi nhóm 3 que.'),
    mc('Ghép hai hình vuông bằng nhau dọc theo một cạnh. Đường bao ngoài của hình ghép có dạng gì?',['Hình chữ nhật dài','Hình tròn','Hình tam giác','Hình vuông'],'Hai hình đặt sát nhau làm chiều dài gấp đôi chiều rộng.'));
  a('g1-c9','g1-b34',
    mc('Đúng 6 giờ, kim dài chỉ số mấy?',['12','6','3','9'],'Khi chỉ giờ đúng, kim dài chỉ số 12.','recognize'),
    mc('Kim dài chỉ số 12, kim ngắn chỉ số 8. Đồng hồ chỉ mấy giờ?',['8 giờ','12 giờ','4 giờ','6 giờ'],'Khi kim dài chỉ 12, đọc số mà kim ngắn đang chỉ.'),
    mc('Đồng hồ chỉ đúng 3 giờ. Kim ngắn và kim dài lần lượt chỉ vào đâu?',['3 và 12','12 và 3','3 và 3','12 và 12'],'Kim ngắn chỉ 3, kim dài chỉ 12.','trap'),
    sa('Đồng hồ chỉ đúng 5 giờ. Một giờ sau, đồng hồ chỉ đúng mấy giờ?',6,'Sau 5 giờ một giờ là 6 giờ.'));
  a('g2-c8','g2-b37',
    mc('Bốn đĩa, mỗi đĩa 3 quả táo. Phép nhân nào viết đúng tổng 3 + 3 + 3 + 3 theo thứ tự thừa số đã học?',['3 × 4','4 × 3','3 × 3','4 × 4'],'Số 3 là số được lấy, được lặp lại 4 lần.'),
    mc('Phép cộng nào có thể viết gọn thành một phép nhân với hai thừa số đều lớn hơn 1?',['2 + 2 + 2','2 + 3 + 4','4 + 5 + 6','1 + 2 + 3'],'Ba số hạng đều bằng 2, nên viết thành 2 × 3.'),
    sa('Xếp 4 hàng, mỗi hàng 6 ghế. Có tất cả bao nhiêu ghế?',24,'Tổng 6 + 6 + 6 + 6 bằng 24.'));
  a('g2-c8','g2-b40',
    sa('Đếm cách 5 theo thứ tự 5, 10, 15, … Số thứ bảy là bao nhiêu?',35,'Số thứ bảy là 5 × 7 = 35.'),
    mc('Biết 5 × 6 = 30. Tính 5 × 7 nhanh bằng cách nào?',['Lấy 30 cộng 5','Lấy 30 cộng 7','Lấy 30 trừ 5','Lấy 30 cộng 1'],'Từ 6 nhóm lên 7 nhóm thì thêm một nhóm 5.'),
    sa('Hôm nay xếp 8 gói, mỗi gói 5 chiếc bánh. So với khi xếp 6 gói, số bánh tăng bao nhiêu?',10,'Thêm 2 gói, mỗi gói 5 chiếc.'));
  a('g2-c8','g2-b43',sa('Có 18 chiếc đũa. Ghép thành các đôi thì được bao nhiêu đôi?',9,'Mỗi đôi có 2 chiếc. Tính 18 : 2 = 9.'));
  a('g2-c8','g2-b44',sa('Có 35 chiếc bánh, xếp vừa 5 chiếc vào mỗi túi. Cần bao nhiêu túi?',7,'35 : 5 = 7.'));
  a('g2-c9','g2-b46',
    mc('Hộp sữa lon có hai mặt đáy tròn bằng nhau. Hộp có dạng khối gì?',['Khối trụ','Khối cầu','Khối lập phương','Khối hộp chữ nhật'],'Khối trụ có hai mặt đáy hình tròn bằng nhau.','recognize'),
    mc('Vật nào có thể lăn theo mọi hướng trên một mặt phẳng?',['Viên bi dạng khối cầu','Lon dựng đứng trên đáy','Khối gỗ hình lập phương','Hộp sách hình chữ nhật'],'Viên bi dạng khối cầu có mặt cong về mọi phía.'),
    sa('Có 5 viên bi dạng khối cầu và 3 lon dạng khối trụ. Có bao nhiêu vật có hai mặt đáy tròn?',3,'Chỉ 3 lon dạng khối trụ có hai mặt đáy tròn.'));
  a('g2-c13','g2-b66',
    mc('Túi chỉ có bi đỏ và bi xanh. Việc lấy ra một viên bi màu vàng là gì?',['Không thể','Chắc chắn','Có thể nhưng không chắc chắn','Chắc chắn nếu lấy hai lần'],'Không có viên bi màu vàng trong túi.','recognize'),
    mc('Rút một thẻ từ hộp chỉ chứa thẻ tròn. Lấy được thẻ tròn là việc gì?',['Chắc chắn','Không thể','Có thể nhưng không chắc chắn','Tùy thẻ nằm trên hay dưới'],'Mọi thẻ trong hộp đều tròn.','recognize'));
  a('g3-c3','g3-b17',
    mc('Đoạn thẳng đi qua tâm và nối hai điểm trên đường tròn gọi là gì?',['Đường kính','Bán kính','Chu vi','Cạnh bên'],'Đường kính nối hai điểm trên đường tròn và đi qua tâm.','recognize'),
    sa('Một đường kính dài 14 cm. Bán kính dài bao nhiêu cm?',7,'Đường kính dài gấp đôi bán kính.'));
  a('g3-c3','g3-b18',
    mc('Ở góc xOy, chữ cái nào chỉ đỉnh góc?',['O','x','y','xy'],'Hai cạnh Ox, Oy có điểm đầu chung là O.','recognize'),
    mc('Dụng cụ nào dùng để kiểm tra một góc có vuông không?',['Ê ke','Compa','Cân','Đồng hồ'],'Đặt đỉnh góc vuông của ê ke trùng đỉnh góc rồi so hai cạnh.','recognize'),
    sa('Hình chữ nhật có bao nhiêu góc vuông?',4,'Cả bốn góc của hình chữ nhật là góc vuông.','recognize'),
    mc('Gấp một tờ giấy chữ nhật theo đường chéo. Góc giữa hai mép giấy vốn gặp nhau ở một góc của tờ giấy và cùng thuộc một nửa tờ giấy là góc gì?',['Góc vuông','Góc không vuông','Không tạo góc','Góc có hai đỉnh'],'Hai cạnh kề của tờ giấy giữ nguyên góc 90°.'),
    mc('Hai kim của đồng hồ lúc đúng 3 giờ tạo thành góc gì?',['Góc vuông','Góc không vuông','Hai kim trùng nhau','Không có góc'],'Kim dài chỉ 12 và kim ngắn chỉ 3, hai hướng tạo một góc vuông.','apply',{type:'clock',h:3,m:0}),
    mc('Hình vẽ có góc vuông hay góc không vuông?',['Góc không vuông','Góc vuông','Hai góc vuông','Không có góc'],'Góc vẽ nhỏ hơn góc vuông.','recognize',{type:'angle',a:50}));
  a('g3-c3','g3-b19',
    mc('Hình phẳng nào luôn có đúng 4 cạnh?',['Tứ giác','Tam giác','Hình tròn','Đoạn thẳng'],'Tứ giác có bốn cạnh.','recognize'),
    mc('Hình nào có bốn cạnh bằng nhau và bốn góc vuông?',['Hình vuông','Tam giác','Hình tròn','Hình chữ nhật có hai cạnh dài'],'Đây là hai đặc điểm của hình vuông.','recognize'),
    mc('Mặt trước của quyển sách có hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau và bốn góc vuông. Đó là hình gì?',['Hình chữ nhật','Hình vuông','Hình tam giác','Hình tròn'],'Bốn góc vuông và hai cặp cạnh đối bằng nhau là đặc điểm hình chữ nhật.'),
    sa('Hai hình tam giác rời nhau có tất cả bao nhiêu cạnh?',6,'Mỗi tam giác có 3 cạnh. Có 3 + 3 = 6 cạnh.'),
    sa('Một tam giác và một tứ giác rời nhau có tất cả bao nhiêu đỉnh?',7,'Tam giác có 3 đỉnh, tứ giác có 4 đỉnh.'),
    mc('Chỉ biết một hình có bốn góc vuông. Có thể khẳng định cả bốn cạnh bằng nhau không?',['Không, hình chữ nhật dài là một ví dụ','Có, mọi hình bốn góc vuông đều có cạnh bằng nhau','Có, vì hình nào cũng có cạnh bằng nhau','Không, vì hình vuông không có góc vuông'],'Hình chữ nhật có chiều dài khác chiều rộng vẫn có bốn góc vuông.','trap'),
    sa('Vẽ một đường nối hai đỉnh đối diện của hình chữ nhật. Hình được chia thành bao nhiêu tam giác?',2,'Đường chéo chia hình chữ nhật thành hai tam giác.'),
    mc('Hình tô màu có bao nhiêu cạnh?',['3','2','4','0'],'Hình tam giác có 3 cạnh.','recognize',{type:'shape',shape:'triangle',variant:0}),
    mc('Trong các cặp hình, cặp nào gồm hai tứ giác?',['Hình vuông và hình chữ nhật','Tam giác và hình chữ nhật','Hình tròn và hình vuông','Hai tam giác'],'Cả hình vuông và hình chữ nhật đều có bốn cạnh.'),
    mc('Đổi hướng đặt một hình chữ nhật trên bàn. Điều gì được giữ nguyên?',['Số cạnh và số góc vuông','Chỉ số cạnh','Chỉ số góc vuông','Số cạnh tăng lên'],'Quay hình không thay đổi cạnh hay góc của nó.','trap'));
  a('g3-c3','g3-b20',
    mc('Để vẽ đường tròn tâm O bán kính 3 cm, cần mở compa rộng bao nhiêu?',['3 cm','6 cm','1 cm','9 cm'],'Khoảng cách hai đầu compa bằng bán kính.'),
    mc('Muốn vẽ một góc vuông có đỉnh A, cần đặt phần nào của ê ke tại A?',['Đỉnh góc vuông','Trung điểm cạnh dài nhất','Một điểm bất kỳ','Cạnh huyền'],'Đỉnh của góc vẽ phải trùng với đỉnh góc vuông của ê ke.'));
  a('g3-c15','g3-b74',
    mc('Gieo một xúc xắc có các mặt chấm từ 1 đến 6. Nhận được mặt 7 chấm là sự kiện gì?',['Không thể','Chắc chắn','Có thể nhưng không chắc chắn','Chỉ xảy ra khi gieo hai lần'],'Xúc xắc không có mặt 7 chấm.','recognize'),
    mc('Bốc một thẻ từ hộp có thẻ vàng và thẻ đỏ. Lấy được thẻ vàng là sự kiện gì?',['Có thể nhưng không chắc chắn','Chắc chắn','Không thể','Chắc chắn nếu lắc hộp'],'Hộp có thẻ vàng nhưng cũng có thẻ đỏ.'));
  a('g4-c1','g4-b3',
    mc('Chỉ cần nhìn chữ số nào để biết một số tự nhiên là chẵn hay lẻ?',['Chữ số hàng đơn vị','Chữ số hàng chục','Chữ số hàng trăm','Chữ số đầu tiên'],'Số chẵn có chữ số tận cùng là 0, 2, 4, 6 hoặc 8.','recognize'),
    mc('Tổng hai số lẻ luôn là số gì?',['Số chẵn','Số lẻ','Số có tận cùng 5','Tùy trường hợp'],'Mỗi số lẻ chia cho 2 dư 1. Hai phần dư gộp lại thành 2.','apply'),
    mc('Lấy một số chẵn trừ một số lẻ nhỏ hơn nó. Kết quả là số gì?',['Số lẻ','Số chẵn','Số 0','Số có tận cùng 0'],'Hai số khác tính chẵn lẻ có hiệu là số lẻ.'),
    sa('Trong các số tự nhiên từ 21 đến 29, kể cả 21 và 29, có bao nhiêu số lẻ?',5,'Có 21, 23, 25, 27, 29.'),
    sa('Có bao nhiêu chữ số x để số 31x là số chẵn?',5,'x có thể là 0, 2, 4, 6 hoặc 8.'),
    mc('Trong một dãy ba số tự nhiên liên tiếp bắt đầu bằng số lẻ, số ở giữa là số gì?',['Số chẵn','Số lẻ','Luôn là số 0','Không đủ dữ kiện'],'Hai số tự nhiên liên tiếp luôn khác tính chẵn lẻ.','trap'),
    mc('Số 2 560 là số chẵn vì sao?',['Vì chữ số hàng đơn vị là 0','Vì chữ số hàng chục là 6','Vì có chữ số 5','Vì có bốn chữ số'],'Chỉ xét chữ số hàng đơn vị.','recognize'));
  a('g4-c2','g4-b7',
    mc('Khi đo góc bằng thước đo góc, đặt tâm thước trùng với điểm nào?',['Đỉnh góc','Trung điểm một cạnh','Đầu kia của cạnh góc','Một điểm bất kỳ trên cạnh'],'Tâm thước đặt ở đỉnh, vạch 0° đặt theo một cạnh.','recognize'),
    sa('Tia Oy nằm trong góc xOz. Biết xOz = 110°, xOy = 48°. Tính góc yOz theo độ.',62,'Hai góc nhỏ cộng lại bằng 110°. Vậy góc còn lại là 62°.'),
    mc('Thước có hai thang đo. Sau khi đặt cạnh đầu theo vạch 0°, phải đọc thang nào?',['Thang bắt đầu bằng 0° trên cạnh đã đặt','Luôn đọc thang phía ngoài','Luôn đọc số lớn hơn','Luôn đọc thang phía trong'],'Bắt đầu từ vạch 0° của cạnh làm mốc để đọc đúng chiều.','trap'));
  a('g4-c2','g4-b8',
    mc('Góc nào lớn hơn góc vuông và nhỏ hơn góc bẹt?',['Góc tù','Góc nhọn','Góc vuông','Góc bẹt'],'Góc tù lớn hơn 90° và nhỏ hơn 180°.','recognize'),
    sa('Có ba góc 89°, 90° và 91°. Có bao nhiêu góc nhọn?',1,'Chỉ có góc 89° nhỏ hơn góc vuông.','trap'));
  a('g4-c4','g4-b19',
    sa('Một bạn chạy hết 1 phút 18 giây. Đổi thời gian đó ra giây.',78,'1 phút = 60 giây, cộng thêm 18 giây.'),
    mc('Năm 1900 thuộc thế kỉ nào?',['Thế kỉ XIX','Thế kỉ XX','Thế kỉ XVIII','Thế kỉ XXI'],'Thế kỉ XIX tính từ 1801 đến hết 1900.','trap'),
    sa('Một người đếm giờ từ giây 42 của một phút đến hết phút đó. Còn bao nhiêu giây?',18,'Một phút có 60 giây. Lấy 60 − 42 = 18.'),
    mc('Năm nào sau đây là năm đầu tiên của thế kỉ XXI?',['2001','2000','1901','2100'],'Thế kỉ XXI gồm các năm từ 2001 đến 2100.','trap'));
  a('g4-c6','g4-b29',
    mc('Trong hình chữ nhật ABCD, cặp cạnh nào song song?',['AD và BC','AB và BC','AD và DC','AB và AD'],'Hai cạnh đối AD và BC song song.'),
    mc('Hai đường thẳng song song có gặp nhau nếu kéo dài về hai phía không?',['Không','Có một điểm chung','Có hai điểm chung','Luôn trùng nhau'],'Hai đường thẳng song song không cắt nhau.','recognize'),
    mc('Hình vuông có bao nhiêu cặp cạnh đối song song?',['2 cặp','1 cặp','3 cặp','4 cặp'],'Một cặp là cạnh trên và dưới, cặp kia là cạnh trái và phải.'),
    mc('Hai đường ray thẳng trên một đoạn đường thường biểu diễn cặp đường nào?',['Hai đường thẳng song song','Hai đường thẳng vuông góc','Hai đường cắt nhau','Một đường duy nhất'],'Hai đường ray thẳng giữ khoảng cách và không gặp nhau.'));
  a('g4-c6','g4-b30',
    mc('Trên giấy kẻ ô, để vẽ hai đường thẳng song song theo phương ngang, nên kẻ thế nào?',['Theo hai dòng kẻ ngang khác nhau','Một dòng ngang và một dòng dọc','Theo hai đường chéo cắt nhau','Theo cùng một dòng ngang'],'Các dòng ngang khác nhau không cắt nhau.'),
    mc('Muốn kiểm tra hai đường thẳng vẽ trên giấy có cùng vuông góc với một đường thứ ba, nên dùng gì?',['Ê ke','Compa','Đồng hồ','Thước đo độ dài riêng'],'Ê ke giúp kiểm tra góc vuông.'));
  a('g5-c6','g5-b32',
    sa('Một hình vuông có chu vi 36 cm. Cạnh hình vuông dài bao nhiêu cm?',9,'Bốn cạnh bằng nhau nên lấy 36 : 4.'),
    sa('Hình chữ nhật có diện tích 84 cm² và chiều rộng 7 cm. Tính chiều dài theo cm.',12,'Chiều dài bằng diện tích chia chiều rộng.'),
    mc('Cắt hình chữ nhật thành hai tam giác bằng nhau theo đường chéo. Diện tích mỗi tam giác thế nào?',['Bằng nửa diện tích hình chữ nhật','Bằng diện tích hình chữ nhật','Bằng một phần ba diện tích hình chữ nhật','Luôn bằng chu vi hình chữ nhật'],'Hai tam giác bằng nhau ghép đúng thành hình chữ nhật.'),
    sa('Hình bình hành có đáy 12 cm, chiều cao tương ứng 7 cm. Tính diện tích theo cm².',84,'Lấy đáy nhân với chiều cao.'),
    mc('Hình thoi có hai đường chéo dài 6 cm và 10 cm. Diện tích bằng bao nhiêu?',['30 cm²','60 cm²','16 cm²','8 cm²'],'Diện tích bằng tích hai đường chéo chia 2.'));
  a('g5-c7','g5-b36',
    sa('Lớp có 40 học sinh, trong đó 18 bạn đi bộ đến trường. Tỉ số phần trăm của số bạn đi bộ so với cả lớp là bao nhiêu? Điền số trước dấu phần trăm.',45,'Lấy 18 chia 40, rồi nhân 100.'),
    mc('Một hộp có 12 bút đỏ và 8 bút xanh. Tỉ số số bút đỏ so với toàn bộ số bút là gì?',['3/5','3/2','2/5','2/3'],'Có 20 chiếc bút. Tỉ số là 12/20 = 3/5.','trap'),
    mc('25% của một nhóm nghĩa là phần nào của nhóm đó?',['Một phần tư','Một phần hai','Ba phần tư','Hai phần năm'],'25% = 25/100 = 1/4.','recognize'));
  a('g5-c9','g5-b51',
    sa('Hình lập phương cạnh 5 cm. Sơn tất cả các mặt trừ mặt đáy, diện tích được sơn là bao nhiêu cm²?',125,'Sơn 5 mặt, mỗi mặt rộng 25 cm².'),
    mc('Diện tích toàn phần của hình lập phương gấp mấy lần diện tích một mặt?',['6 lần','4 lần','5 lần','8 lần'],'Hình lập phương có sáu mặt vuông bằng nhau.','recognize'));
  a('g5-c11','g5-b64',
    sa('Trên biểu đồ quạt tròn, hai nhóm lần lượt chiếm 35% và 20%. Nhóm còn lại chiếm bao nhiêu phần trăm? Điền số trước dấu phần trăm.',45,'Tổng là 100%, nên phần còn lại là 100 − 35 − 20.'),
    sa('Lớp có 32 bạn. Phần đi bộ chiếm 25% hình quạt tròn. Có bao nhiêu bạn đi bộ?',8,'25% bằng một phần tư. Tính 32 : 4 = 8.'),
    mc('Hai phần của cùng một biểu đồ quạt tròn có diện tích bằng nhau. Điều gì được kết luận?',['Hai nhóm có cùng tỉ lệ','Hai nhóm đều bằng nửa tổng','Hai nhóm có số lượng khác nhau','Hai nhóm đều bằng một phần ba tổng'],'Trên cùng biểu đồ, diện tích hình quạt biểu diễn tỉ lệ.'));

  a('g6-c2','g6-b8',
    mc('Biết a và b đều chia hết cho 6. Kết luận nào luôn đúng?',['a + b chia hết cho 6','a + b chia hết cho 12','a − b chia hết cho 12 khi a ≥ b','a + 1 chia hết cho 6'],'Viết a = 6m, b = 6n, suy ra a + b = 6(m + n).','recognize'),
    sa('Trong các số từ 1 đến 30, có bao nhiêu bội dương của 7?',4,'Các số cần đếm là 7, 14, 21 và 28.'));
  a('g6-c2','g6-b9',
    sa('Có bao nhiêu chữ số x để số 62x chia hết cho cả 2 và 3?',1,'x chẵn và 8 + x chia hết cho 3. Trong 0, 2, 4, 6, 8 chỉ có 4 thỏa mãn.', 'trap'),
    mc('Số chia hết cho 9 nhưng không chia hết cho 2 là số nào?',['153','126','215','1890'],'153 có tổng chữ số 9 và tận cùng lẻ.','trap'),
    sa('Tìm chữ số x để số 4x5 chia hết cho 9 và có giá trị lớn nhất.',9,'Tổng chữ số là 9 + x. x có thể bằng 0 hoặc 9, chọn 9.'));
  a('g6-c5','g6-b22',
    mc('Tâm đối xứng của hình bình hành nằm ở đâu?',['Giao điểm hai đường chéo','Một đỉnh bất kỳ','Trung điểm một cạnh','Ngoài hình'],'Hai đường chéo của hình bình hành cắt nhau tại trung điểm mỗi đường.','recognize'),
    mc('Khi quay một hình quanh tâm đối xứng của nó một góc nửa vòng, hình thu được thế nào?',['Trùng với hình ban đầu','Luôn nằm bên trái hình ban đầu','Nhỏ bằng một nửa','Luôn lệch ra khỏi hình ban đầu'],'Hai điểm đối xứng qua tâm đổi chỗ cho nhau khi quay nửa vòng.','recognize'),
    mc('Hình nào có tâm đối xứng?',['Hình chữ nhật','Tam giác đều','Tam giác vuông','Tam giác cân'],'Quay hình chữ nhật nửa vòng quanh giao điểm hai đường chéo cho hình ban đầu.','trap'));
  a('g6-c8','g6-b37',
    mc('Góc có số đo 180° là góc gì?',['Góc bẹt','Góc tù','Góc nhọn','Góc vuông'],'Hai cạnh của góc bẹt là hai tia đối nhau.','recognize'),
    sa('Tia Oz nằm trong góc xOy. Biết xOz = 37° và zOy = 68°. Tính xOy theo độ.',105,'Cộng 37° và 68°.'),
    sa('Trong một góc vuông xOy, tia Oz tạo với Ox một góc 28°. Tia Oz nằm trong góc xOy. Tính góc zOy theo độ.',62,'Lấy 90° trừ 28°.'),
    mc('Cùng dùng một tia làm cạnh mốc, cạnh còn lại nằm về phía vạch 0° nào thì đọc thế nào?',['Đọc từ vạch 0° trùng tia mốc','Luôn đọc hàng số phía trong','Luôn đọc hàng số phía ngoài','Luôn đọc số lớn hơn'],'Đọc đúng chiều kể từ tia mốc để tránh lấy góc bù.','trap'));
  // Ngô Đức Tài, Bộ đề ôn theo chương HK1 Toán 7, Chương 1, Đề 1.
  const rationalLine={
    type:'numberLine',ticks:17,showAllTicks:true,
    above:[[0,'A'],[6,'B'],[8,'O'],[11,'C'],[16,'D']],
    below:[[2,'−1'],[5,'−1/2'],[10,'1/3'],[14,'1']],
    description:'Trục số chia đều 17 vạch. Từ trái sang phải, các vạch có nhãn là vạch 1: A, 3: −1, 6: −1/2, 7: B, 9: O, 11: 1/3, 12: C, 15: 1, 17: D.'
  };
  const comparisonLine={
    type:'numberLine',ticks:11,above:[[2,'b'],[7,'a']],below:[[5,'O']],
    description:'Trên trục số, các điểm theo thứ tự từ trái sang phải là b, O, a.'
  };
  const comparisonAnswer='Nhập −1 nếu x < y, 0 nếu x = y, hoặc 1 nếu x > y.';
  a('g7-c1','g7-b1',
    mc('Tập hợp số hữu tỉ được kí hiệu là',['ℚ','ℕ','ℤ','ℝ'],
      'ℚ kí hiệu tập hợp các số hữu tỉ. ℕ, ℤ và ℝ lần lượt kí hiệu tập hợp các số tự nhiên, số nguyên và số thực.','recognize'),
    mc('Cách viết nào mô tả đầy đủ tập hợp số hữu tỉ?',['a/b với a, b ∈ ℤ và b ≠ 0','a/b với a, b ∈ ℤ','a/b với a, b ∈ ℕ','a/b với a, b ∈ ℕ và b ≠ 0'],
      'Tử và mẫu đều là số nguyên, mẫu phải khác 0. Dùng cả các số nguyên âm để biểu diễn được số hữu tỉ âm.','recognize'),
    mc('Biểu thức nào sau đây không biểu diễn một số hữu tỉ?',['3/0','−1/2','3 5/8','1,5'],
      '3/0 không xác định vì mẫu bằng 0. Hỗn số 3 5/8 bằng 29/8 và 1,5 bằng 3/2.','trap'),
    mc('Trên trục số, các điểm B và C lần lượt biểu diễn những số hữu tỉ nào?',['−1/3 và 1/2','1/3 và 1/2','−1/3 và 1/4','−1/3 và 1/6'],
      'Từ O đến 1 có 6 khoảng bằng nhau. B nằm bên trái O 2 khoảng, C nằm bên phải O 3 khoảng.','apply',rationalLine),
    mc('Số đối của số hữu tỉ 7/2 là',['−7/2','2/7','−2/7','3,5'],
      'Hai số đối nhau có tổng bằng 0. Ta có 7/2 + (−7/2) = 0.','recognize'),
    mc('Số hữu tỉ có thể xuất hiện dưới những dạng nào dưới đây? Chọn phương án đầy đủ nhất.',[
      'Cả ba dạng được liệt kê','Số thập phân viết được dưới dạng phân số thập phân','Số nguyên','Hỗn số'
    ],'Số nguyên viết được với mẫu 1, hỗn số đổi được thành phân số và phân số thập phân có mẫu là lũy thừa của 10.','recognize'),
    mc('Hai điểm biểu diễn hai số hữu tỉ khác 0 đối nhau có vị trí thế nào? Chọn mô tả đầy đủ nhất.',[
      'Nằm ở hai phía của O và cách O một khoảng bằng nhau','Nằm cùng phía so với O','Nằm ở hai phía của O','Trùng nhau'
    ],'Hai số khác 0 đối nhau trái dấu và có cùng khoảng cách đến 0.','trap'),
    mc('Điểm nào biểu diễn số đối của −1/2?',['Điểm C','Điểm A','Điểm B','Điểm D'],
      'Số đối của −1/2 là 1/2. Trên hình, điểm C nằm ở vị trí đối xứng với vạch −1/2 qua O.','apply',rationalLine),
    mc('Cho a, b, c là các số hữu tỉ. Nếu a < b và b < c, quan hệ nào xác định thứ tự của a và c và loại trừ trường hợp bằng nhau?',[
      'a < c','a = c','a > c','a ≤ c'
    ],'Tính chất bắc cầu cho a < c. Dấu ≤ vẫn bao gồm trường hợp bằng nhau nên không diễn đạt chính xác bằng dấu <.','recognize'),
    mc('Trên trục số nằm ngang có chiều dương từ trái sang phải, nếu a < b thì điều gì luôn đúng?',[
      'Điểm biểu diễn a nằm bên trái điểm biểu diễn b','Hai điểm biểu diễn a và b trùng nhau',
      'Điểm biểu diễn a nằm bên phải điểm biểu diễn b','Cả hai điểm đều nằm bên phải O'
    ],'Điểm biểu diễn số nhỏ hơn nằm bên trái điểm biểu diễn số lớn hơn.','recognize'),
    mc('Hai số hữu tỉ a và b được biểu diễn như hình. Khẳng định nào đúng?',['b < 0 < a','b > 0 > a','b > a','b < a < 0'],
      'Điểm b nằm bên trái O nên b < 0. Điểm a nằm bên phải O nên a > 0.','apply',comparisonLine),
    mc('Dãy các số hữu tỉ nào được sắp xếp theo thứ tự tăng dần?',[
      '−5/27; −1/9; 8/125; 7/25','−1/9; −5/27; 7/25; 8/125',
      '7/25; 8/125; −1/9; −5/27','8/125; 7/25; −1/9; −5/27'
    ],'Ta có −1/9 = −3/27 và 7/25 = 35/125. So sánh hai cặp cùng mẫu rồi đặt các số âm trước các số dương.'),
    tf('Cho các số hữu tỉ −13/12; −4/5; −17/15; 1/5; 0; 9/4. Xét các phát biểu sau.',[
      ['Các số hữu tỉ âm là −13/12; −4/5; −17/15.',true,'Ba phân số này đều có tử âm, mẫu dương.'],
      ['Có ba số hữu tỉ dương.',false,'Chỉ 1/5 và 9/4 là số dương. Số 0 không dương.'],
      ['Số hữu tỉ lớn nhất là 9/4.',true,'9/4 > 1, còn 1/5 < 1 và các số còn lại không dương.'],
      ['Thứ tự tăng dần là −17/15; −13/12; −4/5; 0; 1/5; 9/4.',true,'Quy đồng ba số âm về mẫu 60, được −68/60 < −65/60 < −48/60.']
    ]),
    sa('Trong các phân số −12/15; −15/20; 24/(−32); −20/28; −27/36, có bao nhiêu phân số biểu diễn số hữu tỉ 3/(−4)?',
      3,'Rút gọn được −15/20 = 24/(−32) = −27/36 = −3/4. Hai phân số còn lại bằng −4/5 và −5/7.'),
    sa('Có bao nhiêu số nguyên x thỏa mãn −8/15 < x/15 < −1/3?',
      2,'Nhân cả ba vế với 15 được −8 < x < −5. Hai giá trị nguyên là −7 và −6.'),
    sa('Trong các phân số −10/15; 14/(−21); −8/16; −18/27; 22/(−33); −16/20, có bao nhiêu phân số biểu diễn số hữu tỉ 2/(−3)?',
      4,'Các phân số −10/15, 14/(−21), −18/27 và 22/(−33) đều rút gọn thành −2/3.'),
    sa('Có bao nhiêu số nguyên x thỏa mãn −3/4 < x/12 < −1/6?',
      6,'Nhân cả ba vế với 12 được −9 < x < −2. Có sáu số nguyên từ −8 đến −3.'),
    sa('Tuổi thọ trung bình dự kiến của người sinh năm 2023 ở 5 quốc gia được cho dưới đây (đơn vị: năm).\n'+
      '1. Australia: 82\n2. Pháp: 81,5\n3. Tây Ban Nha: 82 1/5\n4. Anh: 80 2/5\n5. Mỹ: 77 1/2\n'+
      'Sắp xếp các quốc gia theo tuổi thọ dự kiến từ nhỏ đến lớn. Nhập 5 chữ số tương ứng theo thứ tự, viết liền.',
      54213,'Ta có 77,5 < 80,4 < 81,5 < 82 < 82,2. Thứ tự là Mỹ, Anh, Pháp, Australia, Tây Ban Nha.'),
    sa('So sánh x = −7/5 và y = −11/9. '+comparisonAnswer,
      -1,'Quy đồng về mẫu 45: x = −63/45, y = −55/45. Vậy x < y.'),
    sa('So sánh x = 4/7 và y = 13/17. '+comparisonAnswer,
      -1,'Quy đồng về mẫu 119: x = 68/119, y = 91/119. Vậy x < y.'),
    sa('So sánh x = −7/3 và y = 13/(−6). '+comparisonAnswer,
      -1,'Quy đồng về mẫu 6: x = −14/6, y = −13/6. Vậy x < y.'),
    sa('So sánh x = −0,75 và y = 3/(−4). '+comparisonAnswer,
      0,'Đổi −0,75 = −75/100 = −3/4 = 3/(−4). Vậy x = y.'));
  a('g7-c1','g7-b2',
    tf('Cho x ∈ ℚ và A = (3 − x)/(x + 1). Xét các phát biểu sau.',[
      ['Có 3 giá trị nguyên dương của x để A là số hữu tỉ dương.',false,'Với x nguyên dương, mẫu dương. Tử dương khi x < 3, nên chỉ có x = 1 và x = 2.'],
      ['Với mọi giá trị x < 0, A luôn là số hữu tỉ âm.',false,'Chẳng hạn x = −1/2 thì tử và mẫu đều dương. Tại x = −1, A không xác định.'],
      ['Điều kiện để A là số hữu tỉ là x ≠ 0.',false,'Điều kiện là x ≠ −1 để mẫu khác 0. Với x = 0, A vẫn bằng 3.'],
      ['Khi x = 2 thì A < 1/2.',true,'Thay x = 2, được A = 1/3 < 1/2.']
    ],'trap'),
    sa('Cho số hữu tỉ x = (a − 3)/a, với a là số nguyên khác 0. Có bao nhiêu giá trị của a để x là số nguyên?',
      4,'Viết x = 1 − 3/a. Để x nguyên thì a là ước nguyên của 3, tức a ∈ {−3; −1; 1; 3}.','trap'));
  a('g7-c2','g7-b5',
    mc('Trong 2,1(36), chu kì lặp là gì?',['36','136','1','63'],'Sau chữ số 1, nhóm 36 lặp lại mãi.','recognize'),
    mc('Số 0,(45) bằng phân số nào?',['5/11','9/20','45/100','4/9'],'Gọi số là x. Khi đó 100x − x = 45, nên x = 45/99 = 5/11.'),
    sa('Trong số 0,(27), chữ số thứ 15 sau dấu phẩy là chữ số nào?',2,'Chu kì có hai chữ số. Vị trí lẻ ứng với chữ số 2.'),
    mc('So sánh 0,(6) và 0,66.',['0,(6) lớn hơn','0,(6) nhỏ hơn','Hai số bằng nhau','Không so sánh được'],'Viết 0,66 = 0,66000… và so từ chữ số thứ ba sau dấu phẩy.','trap'));
  a('g7-c5','g7-b17',
    mc('Khi thống kê phương tiện đi học của từng bạn, dữ liệu “xe đạp”, “đi bộ”, “xe buýt” thuộc loại nào?',['Dữ liệu phân loại','Dữ liệu số đo','Dữ liệu số đếm','Dữ liệu thời gian'],'Mỗi giá trị là tên một nhóm, không phải số đo.','recognize'),
    mc('Muốn ước lượng tỉ lệ học sinh toàn trường thích đọc sách, nên hỏi nhóm nào?',['Một mẫu học sinh ở nhiều lớp và nhiều khối','Chỉ thành viên câu lạc bộ đọc sách','Chỉ các bạn ngồi bàn đầu một lớp','Chỉ học sinh vừa mượn sách'],'Mẫu nên bao phủ các nhóm trong đối tượng được khảo sát.','trap'),
    mc('Thống kê tuổi theo số năm tròn của học sinh cho dữ liệu gì?',['Dữ liệu số','Dữ liệu tên người','Dữ liệu phân loại không thứ tự','Dữ liệu hình ảnh'],'Mỗi giá trị tuổi được ghi bằng một số.'));
  a('g7-c5','g7-b18',
    sa('Một hình quạt ứng với 72° của biểu đồ tròn. Nhóm đó chiếm bao nhiêu phần trăm tổng số? Điền số trước dấu phần trăm.',20,'72° chiếm 72/360 = 1/5 vòng tròn.'),
    mc('Hai nhóm chiếm 30% và 45% của một biểu đồ tròn. Hình quạt của nhóm thứ hai gấp mấy lần góc ở tâm nhóm thứ nhất?',['1,5 lần','15 lần','2 lần','3 lần'],'Tỉ số góc bằng tỉ số tỉ lệ: 45/30 = 1,5.'));
  a('g7-c8','g7-b29',
    mc('Tung một đồng xu. Biến cố “xuất hiện mặt sấp hoặc mặt ngửa” thuộc loại nào?',['Biến cố chắc chắn','Biến cố không thể','Biến cố ngẫu nhiên không chắc chắn','Biến cố chỉ xảy ra nếu tung hai lần'],'Hai mặt này bao gồm mọi kết quả có thể.','recognize'),
    mc('Gieo một xúc xắc chuẩn. Biến cố nào không thể xảy ra?',['Số chấm là bội dương của 7','Số chấm là số nguyên tố','Số chấm lớn hơn 4','Số chấm nhỏ hơn 7'],'Chỉ có thể xuất hiện một trong các số chấm từ 1 đến 6.'));
  a('g7-c9','g7-b31',
    mc('Trong tam giác ABC, nếu góc A lớn hơn góc C thì cạnh nào dài hơn?',['BC dài hơn AB','AB dài hơn BC','AC dài hơn BC','BC bằng AB'],'Cạnh đối diện góc A là BC, cạnh đối diện góc C là AB.','trap'),
    mc('Nếu tam giác ABC có AB = AC và góc B = 55°, góc C bằng bao nhiêu?',['55°','70°','110°','125°'],'Hai cạnh bằng nhau đối diện hai góc bằng nhau.'),
    sa('Một tam giác có ba góc 40°, 60°, 80°. Góc đối diện cạnh ngắn nhất bằng bao nhiêu độ?',40,'Cạnh ngắn nhất đối diện góc nhỏ nhất.'),
    mc('Tam giác ABC có góc A tù. Cạnh dài nhất là cạnh nào?',['BC','AB','AC','Chưa đủ thông tin'],'Góc tù là góc lớn nhất, nên cạnh đối diện BC dài nhất.'));
  a('g7-c9','g7-b32',
    mc('Từ A nằm ngoài d, hạ AH vuông góc d. B và C thuộc d, HB < HC. So sánh AB và AC.',['AB < AC','AB = AC','AB > AC','Không so sánh được'],'Trong hai đường xiên, đường có hình chiếu lớn hơn dài hơn.'),
    mc('A không thuộc d, H là chân đường vuông góc từ A xuống d. Khoảng cách từ A đến d là gì?',['Độ dài AH','Độ dài đường xiên dài nhất','Độ dài một đoạn tùy ý từ A đến d','Độ dài từ H đến điểm bất kỳ trên d'],'Đường vuông góc là đường ngắn nhất từ A đến d.','recognize'),
    sa('AH vuông góc d tại H, B thuộc d. Nếu AH = 8 cm và HB = 6 cm, tính AB theo cm.',10,'Tam giác AHB vuông tại H, nên AB = √(64 + 36) = 10.'),
    mc('A ở ngoài đường thẳng d và AH vuông góc d. Nếu B ∈ d và AB = AH, kết luận nào đúng?',['B trùng H','B ở mọi vị trí trên d','H là trung điểm AB','AB là đường xiên'],'Mọi đường xiên từ A đến d dài hơn AH.','trap'));
  a('g8-c2','g8-b7',
    mc('Trong khai triển (x − 2)³, hệ số của x² bằng bao nhiêu?',['−6','−2','6','12'],'Hạng tử chứa x² là 3x²(−2).','trap'),
    sa('Biết x + y = 5 và xy = 4. Tính x³ + y³.',65,'x³ + y³ = (x + y)³ − 3xy(x + y) = 125 − 60.'));
  a('g8-c2','g8-b9',
    mc('Cách phân tích x² − 6x + 9 thành nhân tử là gì?',['(x − 3)²','(x + 3)²','(x − 9)(x − 1)','x(x − 6)'],'Nhận ra hằng đẳng thức bình phương của một hiệu.','recognize'),
    mc('Phân tích xy + xz + 2y + 2z thành tích.',['(x + 2)(y + z)','(x + y)(z + 2)','x(y + z + 2)','(x − 2)(y + z)'],'Nhóm thành x(y + z) + 2(y + z).'));
  a('g8-c5','g8-b18',
    mc('Dữ liệu “mức độ hài lòng: thấp, vừa, cao” thuộc loại nào?',['Dữ liệu phân loại có thứ tự','Dữ liệu phân loại không thứ tự','Số đo liên tục','Số đếm'],'Ba nhãn có thứ tự tự nhiên, nhưng bản thân chúng là các nhóm.','recognize'),
    mc('Đo chiều dài của lá bằng thước để ghi số liệu là cách thu thập gì?',['Đo trực tiếp','Tra cứu số liệu có sẵn','Lấy ý kiến qua phiếu hỏi','Suy đoán từ tranh minh họa'],'Người thu thập tự đo để lấy giá trị.'));
  a('g8-c6','g8-b22',
    mc('Rút gọn (x² − 16)/(x − 4). Kết quả kèm điều kiện nào đúng?',['x + 4, với x ≠ 4','x + 4, với mọi x','x − 4, với x ≠ −4','x² + 4, với x ≠ 4'],'Phân tích tử rồi rút gọn, giữ điều kiện của mẫu ban đầu.','trap'),
    mc('Có thể nhân tử và mẫu của một phân thức với đa thức nào để tạo phân thức bằng nó?',['Đa thức khác đa thức 0, tại các giá trị biểu thức mới xác định','Bất kỳ đa thức nào, kể cả đa thức 0','Chỉ đa thức bậc nhất','Chỉ một hằng số dương'],'Cần mẫu mới khác 0 tại giá trị đang xét, nên không được nhân với đa thức 0.','recognize'),
    sa('Rút gọn 12x²/(3x) với x ≠ 0. Tính giá trị của biểu thức tại x = −2.',-8,'Rút gọn được 4x rồi thay x = −2.'));
  a('g8-c9','g8-b35',
    mc('Ba độ dài nào là ba cạnh của một tam giác vuông?',['6, 8, 10','3, 4, 6','5, 5, 8','2, 3, 4'],'6² + 8² = 10², dùng định lí Pythagore đảo.'),
    sa('Một thang dài 13 m tựa tường, chân thang cách tường 5 m. Đầu thang cao bao nhiêu mét?',12,'Chiều cao là √(13² − 5²) = 12.'),
    mc('Trong tam giác ABC vuông tại B, cạnh nào phải được bình phương một mình ở một vế của hệ thức Pythagore?',['AC','AB','BC','Cạnh nào cũng được'],'AC đối diện góc vuông nên là cạnh huyền.','trap'));
  a('g8-c9','g8-b37',
    mc('Hai hình đồng dạng với tỉ số độ dài 3. Tỉ số chu vi bằng bao nhiêu?',['3','9','6','27'],'Chu vi là tổng các độ dài nên tăng theo cùng hệ số 3.','trap'),
    mc('Khi phóng to một hình tam giác theo cùng một tỉ lệ ở mọi hướng, đại lượng nào giữ nguyên?',['Số đo các góc','Độ dài các cạnh','Chu vi','Diện tích'],'Phép phóng to giữ góc, nhân mọi độ dài với cùng một hệ số.','recognize'),
    sa('Hai hình đồng dạng. Chu vi của hình lớn là 42 cm, của hình nhỏ là 21 cm. Một cạnh hình lớn dài 18 cm thì cạnh tương ứng hình nhỏ dài bao nhiêu cm?',9,'Tỉ số độ dài lớn : nhỏ là 2, nên cạnh nhỏ dài 18 : 2.'),
    mc('Hình nào đồng dạng với một hình vuông bất kỳ?',['Mọi hình vuông khác','Mọi hình chữ nhật','Mọi hình thoi','Mọi tứ giác'],'Bốn góc và tỉ số các cạnh tương ứng của hai hình vuông đều phù hợp.'),
    sa('Tỉ số độ dài giữa hình nhỏ và hình lớn là 1/2. Hình lớn có diện tích 80 cm². Hình nhỏ có diện tích bao nhiêu cm²?',20,'Tỉ số diện tích bằng bình phương tỉ số độ dài, tức 1/4.'));
  a('g9-c5','g9-b14',
    mc('Hai dây của cùng một đường tròn dài bằng nhau. Hai cung nhỏ do chúng chắn thế nào?',['Có số đo bằng nhau','Luôn bù nhau','Luôn phụ nhau','Chỉ bằng nhau nếu hai dây song song'],'Trong cùng một đường tròn, hai dây bằng nhau căng hai cung nhỏ bằng nhau.','recognize'),
    sa('Một dây dài bằng bán kính đường tròn. Tính số đo cung nhỏ căng bởi dây, theo độ.',60,'Hai bán kính tới hai đầu dây cùng dây tạo tam giác đều.'));
  a('g9-c9','g9-b28',
    mc('Tâm đường tròn nội tiếp tam giác là giao điểm của ba đường nào?',['Đường phân giác trong','Đường cao','Đường trung tuyến','Đường trung trực'],'Tâm nội tiếp cách đều ba cạnh nên nằm trên ba phân giác trong.','recognize'),
    mc('Tâm đường tròn ngoại tiếp tam giác vuông nằm ở đâu?',['Trung điểm cạnh huyền','Đỉnh góc vuông','Trung điểm một cạnh góc vuông','Giao điểm ba đường cao'],'Trung điểm cạnh huyền cách đều ba đỉnh.','recognize'),
    sa('Tam giác có diện tích 42 cm² và nửa chu vi 14 cm. Tính bán kính đường tròn nội tiếp theo cm.',3,'Chia tam giác thành ba tam giác nhỏ có chung chiều cao r, ta được S = pr.'),
    mc('Đường tròn ngoại tiếp tam giác đi qua những điểm nào?',['Ba đỉnh','Ba trung điểm cạnh','Ba chân đường cao trong mọi trường hợp','Chỉ hai đỉnh'],'Đường tròn ngoại tiếp đi qua cả ba đỉnh.','recognize'),
    sa('Bán kính đường tròn ngoại tiếp một tam giác vuông bằng 7 cm. Tính độ dài cạnh huyền theo cm.',14,'Cạnh huyền là đường kính của đường tròn ngoại tiếp.'));
  a('g9-c10','g9-b32',
    mc('Nếu bán kính hình cầu tăng gấp đôi, diện tích mặt cầu thay đổi thế nào?',['Gấp 4 lần','Gấp 2 lần','Gấp 6 lần','Gấp 8 lần'],'Diện tích mặt cầu tỉ lệ với bình phương bán kính.','trap'),
    mc('Cắt một hình cầu bằng mặt phẳng đi qua tâm. Thiết diện là gì?',['Hình tròn có bán kính bằng bán kính hình cầu','Hình vuông','Hình tròn bán kính bằng một nửa bán kính hình cầu','Một điểm'],'Mọi điểm của thiết diện nằm trong bán kính của mặt cầu trong mặt phẳng qua tâm.'),
    sa('Một hình cầu có đường kính 10 cm. Diện tích mặt cầu có dạng kπ cm². Tính k.',100,'Bán kính 5 cm nên S = 4π × 5² = 100π.'),
    mc('Khi bán kính hình cầu giảm còn một nửa, thể tích mới bằng bao nhiêu thể tích cũ?',['1/8','1/2','1/4','1/16'],'Thể tích tỉ lệ với lập phương bán kính.','trap'),
    sa('Thể tích hình cầu bán kính 3 cm có dạng kπ cm³. Tính k.',36,'V = (4/3)π × 3³ = 36π.'));
  a('g10-c1','g10-b1',
    mc('Phủ định của “Mọi số thực x đều thỏa P(x)” là gì?',['Có ít nhất một số thực x không thỏa P(x)','Mọi số thực đều không thỏa P(x)','Có ít nhất một số thực x thỏa P(x)','Không có số thực x'],'Phủ định mệnh đề với mọi bằng cách tìm một phản ví dụ.','trap'),
    mc('Câu nào là mệnh đề có chân trị xác định?',['13 là số nguyên tố','x lớn hơn 3','Mấy giờ rồi?','Hãy mở sách.'],'Câu khẳng định về số 13 có thể xác định đúng hoặc sai.','recognize'),
    mc('Khi nào mệnh đề “Nếu P thì Q” sai?',['P đúng, Q sai','P sai, Q đúng','P và Q đều đúng','P và Q đều sai'],'Phản ví dụ cho kéo theo là một trường hợp có giả thiết đúng và kết luận sai.','trap'));
  a('g10-c2','g10-b3',
    mc('Với bất phương trình x + y ≤ 4, điểm (4; 0) thuộc miền nghiệm không?',['Có, vì hai vế bằng nhau','Không, vì điểm ở trên đường biên','Không, vì y = 0','Cần biết x dương hay âm'],'Dấu ≤ nhận các điểm nằm trên đường biên.','trap'),
    sa('Điểm A(k; 2) nằm trên đường biên của miền nghiệm 2x − y > 4. Tính k.',3,'Đường biên có phương trình 2x − y = 4. Thay y = 2 được x = 3.'));
  a('g10-c2','g10-b4',
    sa('Tính giá trị lớn nhất của x + 2y trên miền x ≥ 0, y ≥ 0, x + y ≤ 5.',10,'Ta có x + 2y ≤ 2(x + y) ≤ 10. Dấu bằng đạt tại (0; 5).'),
    mc('Điểm nào đồng thời thỏa x ≥ 0, y ≥ 0 và 2x + y ≤ 6?',['(2; 2)','(−1; 1)','(4; 0)','(2; 3)'],'Thay (2; 2) vào cả ba bất phương trình, trong đó 2 × 2 + 2 = 6.','trap'));
  a('g10-c8','g10-b25',
    mc('Khai triển (x + 2)⁵ có bao nhiêu hạng tử khác 0 sau khi thu gọn?',['6','5','10','32'],'Các số mũ của x chạy từ 5 xuống 0, mỗi số mũ có một hạng tử.','recognize'),
    sa('Tìm hệ số của x³ trong khai triển (1 + 2x)⁵.',80,'Chọn 2x ở đúng ba trong năm thừa số. Có 10 cách và mỗi cách cho 8x³.'),
    sa('Tính tổng các hệ số của đa thức khai triển từ (2x − 1)⁶.',1,'Đặt x = 1. Khi đó tổng các hệ số bằng (2 − 1)⁶ = 1.','trap'),
    sa('Tìm hệ số tự do trong khai triển (x − 3)⁴.',81,'Chọn −3 ở cả bốn thừa số, được (−3)⁴ = 81.'),
    mc('Trong khai triển (1 − x)⁵, hệ số của x² mang dấu gì?',['Dương','Âm','Bằng 0','Phụ thuộc x'],'Hạng tử x² nhận hai thừa số −x, nên hệ số dương.','trap'),
    sa('Hệ số của x trong khai triển (3 + x)⁴ bằng bao nhiêu?',108,'Chọn x ở đúng một thừa số. Có 4 cách, mỗi cách đóng góp 3³x.'));

  const cube={type:'cube',labels:true};
  a('g11-c4','g11-b10',
    mc('Có đúng một mặt phẳng đi qua ba điểm trong trường hợp nào?',['Ba điểm không thẳng hàng','Ba điểm thẳng hàng phân biệt','Ba điểm trùng nhau','Mọi trường hợp'],'Một đường thẳng có thể nằm trong nhiều mặt phẳng. Ba điểm không thẳng hàng mới xác định duy nhất một mặt phẳng.','trap'),
    mc('Hai mặt phẳng phân biệt (P), (Q) cùng chứa hai điểm phân biệt M, N. Giao tuyến của chúng là gì?',['Đường thẳng MN','Điểm M','Đoạn MN','Một đường không đi qua M'],'Cả hai mặt phẳng chứa toàn bộ đường thẳng qua M, N.'),
    mc('Hai điểm A, B phân biệt nằm trong (P). Điểm M ở ngoài (P). Mặt phẳng (ABM) cắt (P) theo đường nào?',['AB','AM','BM','Qua M và song song AB'],'A và B là hai điểm chung, còn M không nằm trong (P).'),
    mc('Cho tứ diện ABCD. Một mặt phẳng chứa cả A, B, C có chứa D không?',['Không','Có, vì bốn điểm tạo tứ diện','Có, vì mọi tứ diện có bốn điểm đồng phẳng','Còn tùy độ dài AB'],'Bốn đỉnh tứ diện không đồng phẳng.','recognize'),
    mc('Một đường thẳng có hai điểm phân biệt thuộc mặt phẳng (P). Điều gì xảy ra?',['Đường thẳng nằm trong (P)','Đường thẳng chỉ có đúng hai điểm chung với (P)','Đường thẳng song song với (P)','Đường thẳng vuông góc với (P)'],'Nếu mặt phẳng chứa hai điểm phân biệt của một đường thì nó chứa cả đường.','recognize'),
    sa('Có bao nhiêu mặt phẳng phân biệt đi qua ba đỉnh của một tứ diện ABCD?',4,'Mỗi cách chọn 3 trong 4 đỉnh xác định một mặt phẳng mặt của tứ diện.'));
  a('g11-c4','g11-b11',
    mc('Hai đường thẳng phân biệt không cắt nhau trong không gian. Điều kiện nào cần thêm để kết luận chúng song song?',['Hai đường cùng nằm trong một mặt phẳng','Hai đường không cùng nằm trong mặt phẳng nào','Hai đường cắt một đường thứ ba','Hai đường có độ dài bằng nhau'],'Hai đường không cắt nhau có thể chéo nhau. Cần kiểm tra đồng phẳng.','trap'),
    mc('Cho hình lập phương ABCD.A′B′C′D′. Đường thẳng nào song song với AB?',['D′C′','AA′','BB′','AD'],'AB cùng phương với DC và D′C′.','apply',cube),
    mc('Cho hình lập phương ABCD.A′B′C′D′. Cặp đường nào chéo nhau?',['AB và CC′','AB và DC','AC và BD','AA′ và DD′'],'CC′ chỉ gặp mặt phẳng đáy tại C, C không thuộc AB. Hai đường cũng không cùng phương.','trap',cube),
    mc('Trong tứ diện ABCD, M và N lần lượt là trung điểm của AB và AC. MN song song với đường nào?',['BC','AD','BD','CD'],'MN là đường trung bình của tam giác ABC.'),
    mc('Cho a ∥ b và b ∥ c. Biết a và c phân biệt. Kết luận nào đúng?',['a ∥ c','a cắt c','a chéo c','a vuông góc c'],'Hai đường thẳng phân biệt cùng song song với một đường thẳng thì song song với nhau.','recognize'),
    mc('Hai đường thẳng có một điểm chung. Trường hợp nào loại trừ chéo nhau?',['Luôn loại trừ','Chỉ khi hai đường vuông góc','Chỉ khi một đường nằm ngang','Không bao giờ loại trừ'],'Hai đường có điểm chung thì cắt nhau hoặc trùng nhau, đều đồng phẳng.','recognize'),
    sa('Trong tứ diện ABCD, M, N là trung điểm của AC, BC. Nếu AB = 18 cm thì MN dài bao nhiêu cm?',9,'MN là đường trung bình của tam giác ABC.'));
  a('g11-c4','g11-b12',
    mc('Đường a nằm ngoài (P) và song song với một đường b trong (P). Vị trí của a đối với (P) là gì?',['Song song','Cắt tại một điểm','Nằm trong','Vuông góc'],'Dùng dấu hiệu đường thẳng ngoài mặt phẳng và song song với một đường trong mặt phẳng.','recognize'),
    mc('Đường a nằm trong (P) và song song với b cũng nằm trong (P). Kết luận nào đúng?',['a có vô số điểm chung với (P)','a ∥ (P)','a chỉ có một điểm chung với (P)','a vuông góc (P)'],'a nằm trong (P), mọi điểm của a đều là điểm chung.','trap'),
    mc('Cho hình lập phương ABCD.A′B′C′D′. Đường AB song song với mặt phẳng nào?',['(A′B′C′D′)','(ABB′A′)','(ABCD)','(BCC′B′)'],'AB nằm ngoài mặt trên và song song với A′B′ nằm trong mặt đó.','apply',cube),
    mc('Trong tứ diện ABCD, M và N là trung điểm AB và AC. Đường MN song song với mặt phẳng nào?',['(BCD)','(ABC)','(AMN)','(ABD)'],'MN ∥ BC và BC thuộc (BCD). MN nằm ngoài (BCD).'),
    mc('Cho a ∥ (P), a ⊂ (Q) và (P) ∩ (Q) = b. Quan hệ giữa a và b là gì?',['Song song','Cắt nhau','Chéo nhau','Trùng nhau'],'a và b cùng nằm trong (Q). Nếu cắt b, a sẽ cắt (P).'));
  a('g11-c4','g11-b13',
    mc('Hai mặt phẳng song song có bao nhiêu điểm chung?',['0','1','2','Vô số'],'Hai mặt phẳng song song theo định nghĩa không có điểm chung.','recognize'),
    mc('Mặt phẳng (P) chứa hai đường cắt nhau đều song song với (Q). Kết luận nào đúng?',['(P) song song với (Q)','(P) cắt (Q)','(P) trùng (Q)','Chưa thể suy ra gì'],'Hai đường cắt nhau bảo đảm đủ hai phương trong (P) để dùng định lí.'),
    mc('Mặt phẳng (R) cắt hai mặt phẳng song song (P), (Q). Hai giao tuyến trong (R) quan hệ thế nào?',['Song song','Cắt nhau','Chéo nhau','Trùng nhau'],'Hai giao tuyến cùng nằm trong (R) và không thể có điểm chung.','recognize'),
    mc('Cho hình lập phương ABCD.A′B′C′D′. Mặt phẳng (ABB′A′) song song với mặt phẳng nào?',['(DCC′D′)','(ABCD)','(BCC′B′)','(ADD′A′)'],'Hai mặt đối của hình lập phương song song.','apply',cube),
    mc('Hai đường song song với cùng một mặt phẳng và song song với nhau nằm trong một mặt phẳng (P). Điều đó có đủ để kết luận (P) song song mặt phẳng ban đầu không?',['Chưa đủ, vì mới biết một phương','Đủ trong mọi trường hợp','Đủ nếu hai đường nằm xa nhau','Đủ nếu đổi tên hai đường'],'Dấu hiệu cần hai đường cắt nhau trong (P), tức hai phương phân biệt.','trap'),
    sa('Trong hình lập phương, xét sáu mặt phẳng chứa sáu mặt. Có bao nhiêu cặp mặt phẳng song song?',3,'Có ba cặp mặt đối nhau: trên–dưới, trước–sau, trái–phải.'));
  a('g11-c4','g11-b14',
    mc('Một đường thẳng song song với phương chiếu có ảnh là gì qua phép chiếu song song lên mặt phẳng?',['Một điểm','Một đường thẳng song song với chính nó','Một đường tròn','Một đoạn có độ dài bằng đường ban đầu'],'Mọi đường chiếu qua các điểm trên đường đó đều trùng nhau.','trap'),
    mc('Trung điểm M của AB được chiếu thành M′. Nếu A′ ≠ B′ thì M′ là gì?',['Trung điểm A′B′','Luôn trùng A′','Luôn trùng B′','Điểm ngoài đoạn A′B′'],'Phép chiếu song song bảo toàn tỉ số trên đường thẳng khi ảnh không suy biến.','recognize'),
    sa('A, M, B thẳng hàng theo thứ tự, AM:MB = 2:3. Nếu ảnh A′B′ dài 20 cm thì M′B′ dài bao nhiêu cm?',12,'Ảnh không suy biến giữ tỉ số 2:3. M′B′ chiếm 3 trong 5 phần bằng nhau.'));
  a('g11-c5','g11-b17',
    mc('Để f liên tục tại x₀, điều kiện nào phải đúng?',['Giới hạn của f tại x₀ tồn tại và bằng f(x₀)','Chỉ cần f(x₀) xác định','Chỉ cần hai giới hạn một phía hữu hạn','Giới hạn tại x₀ phải bằng 0'],'Cần có giá trị f(x₀), giới hạn tồn tại và hai giá trị bằng nhau.','recognize'),
    sa('Cho f(x) = (x² − 4)/(x − 2) khi x ≠ 2, và f(2) = m. Tìm m để f liên tục tại 2.',4,'Khi x ≠ 2, rút gọn được x + 2. Giới hạn tại 2 bằng 4.'));
  a('g11-c6','g11-b18',
    mc('Với a > 0, biểu thức a^(−3/2) bằng gì?',['1/(a√a)','a√a','−a√a','1/(3a)'],'Số mũ âm cho nghịch đảo. Ta có a^(3/2) = a√a.','trap'),
    sa('Tính 27^(2/3).',9,'Căn bậc ba của 27 là 3, bình phương được 9.'),
    mc('Với a > 0, aᵐ · aⁿ bằng gì?',['a^(m + n)','a^(mn)','a^(m − n)','2a^(m + n)'],'Nhân hai lũy thừa cùng cơ số thì cộng số mũ.','recognize'));
  a('g11-c8','g11-b29',
    sa('Biết P(A) = 0,45, P(B) = 0,35 và P(A ∩ B) = 0,15. Tính P(A ∪ B).',0.65,'Cộng hai xác suất rồi trừ phần giao đã tính hai lần.'),
    mc('Trong trường hợp nào có thể cộng P(A) + P(B) để tính P(A ∪ B)?',['A và B xung khắc','A và B có cùng xác suất','A và B độc lập với xác suất dương','A và B đều chắc chắn'],'Xung khắc nghĩa là A ∩ B rỗng, xác suất giao bằng 0.','trap'),
    sa('P(A ∪ B) = 0,8, P(A) = 0,6 và P(B) = 0,5. Tính P(A ∩ B).',0.3,'Chuyển vế trong công thức cộng: 0,6 + 0,5 − 0,8 = 0,3.'));
  a('g11-c9','g11-b32',
    mc('Đạo hàm của x² sin x là gì?',['2x sin x + x² cos x','2x cos x','x² cos x','2x sin x − x² cos x'],'Dùng quy tắc đạo hàm tích.'),
    mc('Đạo hàm của sin(3x) là gì?',['3 cos(3x)','cos(3x)','−3 cos(3x)','3 sin(3x)'],'Dùng quy tắc hàm hợp, nhân thêm đạo hàm của 3x.','trap'),
    sa('Tính f′(1) nếu f(x) = (2x + 1)³.',54,'f′(x) = 6(2x + 1)². Thay x = 1 được 54.'),
    sa('Cho f(x) = (x + 1)/(x − 1). Tính f′(2).',-2,'Theo quy tắc thương, f′(x) = −2/(x − 1)².'),
    mc('Với hai hàm khả vi u và v, công thức nào đúng?',['(uv)′ = u′v + uv′','(uv)′ = u′v′','(uv)′ = u′ + v′','(uv)′ = u′v − uv′'],'Mỗi hạng tử lấy đạo hàm một thừa số, giữ thừa số kia.','recognize'),
    sa('Tính f′(0) nếu f(x) = e^(2x) + x⁴.',2,'f′(x) = 2e^(2x) + 4x³. Thay x = 0 được 2.'),
    mc('Đạo hàm của 5x + 7 bằng bao nhiêu?',['5','7','0','12'],'Đạo hàm của 5x là 5 và đạo hàm hằng số là 0.','recognize'));
  a('g12-c4','g12-b11',
    mc('Nếu F là một nguyên hàm của f trên khoảng I thì F + 3 có phải nguyên hàm của f không?',['Có, vì đạo hàm của 3 bằng 0','Không, vì chỉ có một nguyên hàm','Không, vì phải nhân F với 3','Chỉ khi F bằng 0'],'Các nguyên hàm của cùng một hàm trên một khoảng sai khác một hằng số.','recognize'),
    sa('F là nguyên hàm của 6x² và F(1) = 5. Tính F(2).',19,'F(x) = 2x³ + C. Điều kiện F(1) = 5 cho C = 3, do đó F(2) = 19.'));

  return byChapter;
})();

function buExtraPractice(chapterId) {
  return buPracticeAdditions[chapterId]||[];
}

'use strict';

const buReviewedChapters = ['g9-c1','g11-c1'];
const buReviewedLessons = (() => {
  const lessons={};
  const F=String.raw;
  const duy11='https://toanmath.com/toanmath-pdf/cac-dang-bai-tap-mon-toan-11-sach-knttvcs-pham-le-duy.pdf';
  const duy10='https://toanmath.com/toanmath-pdf/cac-dang-bai-tap-mon-toan-10-sach-knttvcs-pham-le-duy.pdf';
  const mcq=(prompt,options,answer,explanation,tag='apply')=>({type:'mcq',prompt,options,answer,explanation,tags:[tag]});
  const short=(prompt,answer,explanation,answerText,tag='apply')=>({type:'short',prompt,answer,explanation,answerText,tags:[tag]});
  const tf=(prompt,rows)=>({type:'tf',prompt,tags:['apply','trap'],statements:rows.map(([text,answer,explanation])=>({text,answer,explanation}))});
  const m=(slug,title,lead,formula,steps,example,...questions)=>({
    slug,title,lead,formula,steps,worked:example?[[title,...example]]:[],questions
  });
  const add=(id,url,label,page,theory,methods,drill=[],diagram='')=>{
    lessons[id]={theory,methods,drill,diagram,source:[url+'#page='+page,label+' · trang PDF '+page]};
  };
  const book=(id,volume,page,theory,methods,drill=[],diagram='')=>{
    const grade=Number(id.match(/^g(\d+)-/)[1]);
    const [label,url]=buBookPDFs[grade][volume-1];
    add(id,url,label,page,theory,methods,drill,diagram);
  };
  const l11=(id,page,theory,methods,drill=[],diagram='')=>add('g11-b'+id,duy11,'Phân dạng Toán 11 KNTT · Phạm Lê Duy',page,theory,methods,drill,diagram);
  const l10=(id,page,theory,methods,drill=[],diagram='')=>add('g10-b'+id,duy10,'Phân dạng Toán 10 KNTT · Phạm Lê Duy',page,theory,methods,drill,diagram);

  l11(1,17,[
    ['Góc định hướng và số đo',[
      'Quay ngược chiều kim đồng hồ lấy dấu dương. Hai góc có cùng tia đầu và tia cuối nếu số đo hơn kém nhau một số nguyên vòng.',
      'Khi cần độ dài cung, dùng số đo rađian của góc quét và bán kính trong cùng đơn vị với độ dài.'
    ],F`180° = π rad
l = R|α| \text{ (với α tính bằng rađian)}`],
    ['Giá trị trên đường tròn đơn vị',[
      'Điểm cuối M có hoành độ cos α và tung độ sin α. Dựa vào góc phần tư để chọn dấu khi khôi phục một giá trị từ bình phương.',
      'Tan xác định khi cos khác 0, cot xác định khi sin khác 0. Chỉ dùng tích tan α cot α = 1 khi cả hai cùng xác định.'
    ],F`M(\cos α;\sin α)
\sin² α+\cos² α=1
\tan α=\frac{\sin α}{\cos α}
\cot α=\frac{\cos α}{\sin α}`],
    ['Góc liên quan',[
      'Góc đối giữ nguyên cosin và đổi dấu sin. Góc bù giữ nguyên sin và đổi dấu cosin. Góc phụ hoán đổi sin và cos.'
    ],F`\cos(−α)=\cos α
\sin(π−α)=\sin α
\cos(π−α)=−\cos α
\sin(\frac{π}{2}−α)=\cos α`]
  ],[
    m('angle','Đổi độ và rađian','Đề cho một đơn vị góc và yêu cầu viết bằng đơn vị kia.',
      F`α \text{ (rađian)}=α \text{ (độ)}\frac{π}{180}`,
      ['Ghi chiều đổi: độ sang rađian hay rađian sang độ.','Nhân với π/180 khi đổi từ độ, với 180/π khi đổi từ rađian.','Rút gọn kết quả và giữ dấu của góc.'],
      ['Đổi −300° sang rađian.',['Nhân −300 với π/180.','Rút gọn −300/180 thành −5/3.'],'−5π/3 rad.'],
      mcq('Góc 7π/12 rad bằng bao nhiêu độ?',['75°','105°','120°','210°'],1,'Nhân 7π/12 với 180/π được 7 × 15° = 105°.','recognize')),
    m('sign','Chọn dấu và tìm các giá trị lượng giác còn lại','Khi đã biết một giá trị và góc phần tư, dùng hệ thức cơ bản để tìm độ lớn rồi mới chọn dấu.',
      F`\cos² α=1−\sin² α`,
      ['Xác định dấu của sin và cos từ tọa độ điểm cuối.','Dùng hệ thức bình phương để tìm độ lớn của giá trị còn thiếu.','Chọn dấu theo góc phần tư, rồi tính tan hoặc cot nếu mẫu khác 0.'],
      ['Biết sin α = 5/13 và α thuộc góc phần tư II. Tính tan α.',['Cosin có độ lớn 12/13 và mang dấu âm.','Chia sin cho cos được −5/12.'],'tan α = −5/12.'],
      short('Biết cos α = −4/5 và π < α < 3π/2. Tính tan α.',.75,'Góc thuộc phần tư III, sin α = −3/5. Chia cho −4/5 được 3/4.','3/4','trap')),
    m('related','Rút gọn giá trị của các góc liên quan','Đề có góc đối, bù, phụ hoặc góc hơn kém một vòng.',
      F`\sin(−x)=−\sin x
\cos(π−x)=−\cos x
\cos(\frac{π}{2}−x)=\sin x`,
      ['Rút số vòng để nhận ra cặp góc.','Xác định phép đối xứng của điểm trên đường tròn.','Thay công thức có dấu đúng rồi mới cộng hoặc nhân.'],
      ['Rút gọn sin(π − x) + sin(−x).',['Số hạng đầu bằng sin x, số hạng sau bằng −sin x.'],'0.'],
      mcq('Với mọi x thực, cos(π − x) + sin(π/2 − x) bằng gì?',['2 cos x','0','−2 cos x','2 sin x'],1,'Hai số hạng lần lượt là −cos x và cos x.','trap'))
  ],[
    mcq('Điểm M trên đường tròn lượng giác có tọa độ (−3/5; 4/5). Giá trị cot α bằng bao nhiêu?',['−3/4','−4/3','3/4','4/3'],0,'Cot là hoành độ chia cho tung độ.'),
    short('Hai tia cùng bắt đầu ở Ox dương, quay lần lượt 30° và 750°. Chúng lệch nhau bao nhiêu vòng tròn đầy?',2,'Hiệu số đo là 720°, bằng hai vòng.'),
    tf('Góc α có điểm cuối M ở góc phần tư IV. Biết |sin α| = 8/17.',[
      ['Tung độ của M âm.',true,'Tung độ bằng sin α và âm ở phần tư IV.'],
      ['Hoành độ của M bằng −15/17.',false,'Độ lớn là 15/17, hoành độ dương.'],
      ['Tan α bằng −8/15.',true,'Chia −8/17 cho 15/17.'],
      ['Góc −α có điểm cuối ở góc phần tư III.',false,'Phản xạ qua trục Ox đưa M vào phần tư I.']
    ])
  ]);

  l11(2,75,[
    ['Cộng và trừ hai góc',[
      'Dùng để tính góc ghép từ góc quen thuộc hoặc thu gọn hai tích cùng cặp góc. Trong công thức cos, dấu ở hạng tử sin a sin b đổi so với dấu giữa hai góc.',
      'Với tan(a ± b), phải có tan a, tan b và tan(a ± b) xác định. Tương đương kiểm tra thêm mẫu 1 ∓ tan a tan b khác 0 khi hai tan thành phần đã tồn tại.'
    ],F`\sin(a±b)=\sin a\cos b±\cos a\sin b
\cos(a±b)=\cos a\cos b∓\sin a\sin b
\tan(a±b)=\frac{\tan a±\tan b}{1∓\tan a\tan b}`],
    ['Nhân đôi và hạ bậc',[
      'Nhận ra 2 sin a cos a hoặc hiệu bình phương sin và cos. Khi chỉ biết sin hay chỉ biết cos, dùng phiên bản cos 2a chứa đúng đại lượng đó.',
      'Hạ bậc giúp đổi bình phương của sin hoặc cos thành biểu thức bậc nhất theo cos 2a. Công thức tan 2a dạng phân thức đòi hỏi cos a khác 0 và tan a khác ±1.'
    ],F`\sin 2a=2\sin a\cos a
\cos 2a=\cos² a−\sin² a=2\cos² a−1=1−2\sin² a
\tan 2a=\frac{2\tan a}{1−\tan² a}
\sin² a=\frac{1−\cos 2a}{2}
\cos² a=\frac{1+\cos 2a}{2}`],
    ['Từ tích sang tổng',[
      'Giữ đúng vai trò của hai góc, nhất là tích sin a cos b. Viết riêng góc tổng và góc hiệu trước khi thế.'
    ],F`2\cos a\cos b=\cos(a+b)+\cos(a−b)
2\sin a\sin b=\cos(a−b)−\cos(a+b)
2\sin a\cos b=\sin(a+b)+\sin(a−b)`],
    ['Từ tổng sang tích',[
      'Gọi u là nửa tổng và v là nửa hiệu của hai góc. Phép biến đổi làm lộ nhân tử chung hoặc cặp triệt tiêu.'
    ],F`u=\frac{a+b}{2},\quad v=\frac{a−b}{2}
\sin a+\sin b=2\sin u\cos v
\sin a−\sin b=2\cos u\sin v
\cos a+\cos b=2\cos u\cos v
\cos a−\cos b=−2\sin u\sin v`.replaceAll('\\quad ','  ')]
  ],[
    m('sum','Công thức cộng','Dùng khi thấy góc như 15°, 75° hoặc cặp tích sin a cos b và cos a sin b.',
      F`\cos(a−b)=\cos a\cos b+\sin a\sin b
\sin(a+b)=\sin a\cos b+\cos a\sin b`,
      ['Tách góc thành tổng hoặc hiệu hai góc biết giá trị, hoặc nhận dạng hai góc trong cặp tích.','Chọn công thức của đúng hàm sin, cos hoặc tan. Kiểm tra dấu khi là cos và kiểm tra mẫu khi là tan.','Thế giá trị chính xác và rút gọn căn, phân số.'],
      ['Tính chính xác cos 15°.',['Tách 15° = 45° − 30°.','Dùng cos hiệu và thế các giá trị ở 45°, 30°.'],F`\frac{\sqrt{6}+\sqrt{2}}{4}`],
      mcq('Giá trị chính xác của cos 105° là bao nhiêu?',[
        F`\frac{\sqrt{6}−\sqrt{2}}{4}`,F`\frac{\sqrt{2}−\sqrt{6}}{4}`,F`\frac{\sqrt{6}+\sqrt{2}}{4}`,F`\frac{1}{2}`
      ],1,'Tách 105° = 60° + 45°. Công thức cos tổng cho √2/4 − √6/4. Dấu âm phù hợp với góc tù.'),
      tf('Cho a = 45° và b = 30°. Xét các phát biểu về góc tổng và hiệu.',[
        ['Sin(a − b) dương.',true,'a − b = 15° thuộc góc phần tư I.'],
        ['Cos(a + b) bằng cos a cos b + sin a sin b.',false,'Trong cos tổng, hạng tử sin a sin b có dấu trừ.'],
        [F`\sin(a+b)=\frac{\sqrt{6}+\sqrt{2}}{4}`,true,'Khai triển sin tổng rồi thế các giá trị ở 45° và 30°.'],
        ['Mẫu 1 − tan a tan b bằng 0.',false,'Tích hai tang bằng 1/√3, nhỏ hơn 1.']
      ])),
    m('double','Công thức nhân đôi','Dùng khi đề chuyển từ góc a sang 2a, hoặc cần giảm bậc của sin² a, cos² a.',
      F`\sin 2a=2\sin a\cos a
\cos 2a=1−2\sin² a=2\cos² a−1`,
      ['Tìm đại lượng đã cho và miền của góc a.','Chọn công thức nhân đôi phù hợp. Nếu cần tích hai giá trị, xác định dấu của giá trị còn thiếu trước.','Nếu cần hạ bậc, giải công thức cos 2a theo bình phương tương ứng.'],
      ['Cho cos a = −5/13 và π/2 < a < π. Tính sin 2a.',['Sin a = 12/13 do a ở góc phần tư II.','Nhân 2 với tích sin a cos a.'],'−120/169.'],
      short('Cho sin a = 3/5. Tính cos 2a.',.28,'Dùng cos 2a = 1 − 2 sin² a = 1 − 18/25 = 7/25.','7/25'),
      mcq('Biểu thức 3 − 4 cos² x viết theo cos 2x thành gì?',['1 − 2 cos 2x','1 + 2 cos 2x','3 − 2 cos 2x','−1 − 2 cos 2x'],0,'Thay cos² x = (1 + cos 2x)/2 rồi thu gọn.')),
    m('product','Đổi tích thành tổng','Khi thấy một tích hai hàm ở hai góc và đề muốn rút gọn hoặc đưa về tổng các hàm.',
      F`2\sin a\cos b=\sin(a+b)+\sin(a−b)
2\sin a\sin b=\cos(a−b)−\cos(a+b)`,
      ['Gọi a và b theo đúng thứ tự của công thức.','Tính a + b và a − b, giữ hệ số 1/2 nếu tích ban đầu không có hệ số 2.','Rút gọn góc âm, góc 0 và các hạng tử cùng góc.'],
      ['Viết 2 sin 4x cos x dưới dạng tổng.',['Hai góc là 4x và x.','Tổng là 5x, hiệu là 3x.'],'sin 5x + sin 3x.'],
      mcq('Biểu thức 2 sin x sin 4x bằng biểu thức nào?',['cos 3x − cos 5x','cos 5x − cos 3x','sin 5x + sin 3x','cos 3x + cos 5x'],0,'Dùng cos(x − 4x) − cos(x + 4x) và tính chẵn của cos.')),
    m('factor','Đổi tổng thành tích','Dùng khi thấy tổng hoặc hiệu hai sin, hai cos và cần đưa về tích.',
      F`\cos a−\cos b=−2\sin(\frac{a+b}{2})\sin(\frac{a−b}{2})`,
      ['Nhận diện cùng hàm sin hoặc cùng hàm cos.','Tính nửa tổng và nửa hiệu theo đúng thứ tự.','Thay vào công thức rồi đơn giản hóa dấu. Nếu là phương trình, cho từng nhân tử bằng 0.'],
      ['Phân tích cos 7x − cos 3x thành tích.',['Nửa tổng bằng 5x, nửa hiệu bằng 2x.','Dùng công thức hiệu hai cos.'],'−2 sin 5x sin 2x.'],
      mcq('Sin 7x + sin x được viết thành tích nào?',['2 sin 4x cos 3x','2 sin 3x cos 4x','2 cos 4x cos 3x','2 sin 8x cos 6x'],0,'Nửa tổng là 4x, nửa hiệu là 3x. Dùng công thức tổng hai sin.'))
  ],[
    mcq('Biểu thức cos 4x cos x + sin 4x sin x thu gọn thành gì?',['cos 5x','cos 3x','sin 3x','cos 4x'],1,'Nhận dạng công thức cos(4x − x).','recognize'),
    short('Biết tan a = 1/3. Tính tan 2a.',.75,'Mẫu 1 − 1/9 khác 0. Chia 2/3 cho 8/9 được 3/4.','3/4'),
    tf('Xét các phép biến đổi sau với x thực.',[
      ['Sin 3x cos x + cos 3x sin x = sin 4x.',true,'Đây là khai triển sin(3x + x).'],
      ['Cos 2x = 1 + 2 sin² x.',false,'Công thức đúng là 1 − 2 sin² x.'],
      ['2 sin 3x cos x = sin 4x − sin 2x.',false,'Công thức tích thành tổng cho sin 4x + sin 2x.'],
      ['Cos 5x + cos x = 2 cos 3x cos 2x.',true,'Nửa tổng bằng 3x, nửa hiệu bằng 2x.']
    ])
  ]);

  l11(3,98,[
    ['Tập xác định, tập giá trị',[
      'Sin và cos xác định trên ℝ và nhận giá trị trong [−1; 1]. Tan và cot nhận mọi giá trị thực trên tập xác định riêng.',
      'Khi hàm có thêm mẫu, căn hoặc phân thức, giao điều kiện của hàm lượng giác với điều kiện của phép toán ngoài.'
    ],F`\tan x: x≠\frac{π}{2}+kπ
\cot x: x≠kπ, k∈ℤ`],
    ['Tính chẵn, lẻ và chu kì',[
      'Kiểm tra tập xác định đối xứng qua 0 trước khi so sánh f(−x) và f(x). Hàm chẵn có đồ thị đối xứng qua Oy, hàm lẻ đối xứng qua O.',
      'Sin, cos có chu kì cơ bản 2π. Tan, cot có chu kì cơ bản π. Với một hàm lượng giác có đối số bx + c và b khác 0, chia chu kì cơ bản cho |b|.'
    ],''],
    ['Đọc đồ thị và khoảng biến thiên',[
      'Biên độ là |A| và đường giữa là y = D đối với y = A sin(bx + c) + D hoặc hàm cos tương tự, khi A và b khác 0.',
      'Chọn một chu kì rồi đọc lần lượt điểm bắt đầu, cực đại, cực tiểu và giao điểm cần tìm.'
    ],'D − |A| ≤ y ≤ D + |A|']
  ],[
    m('domain','Tìm tập xác định','Có tan, cot, mẫu số hoặc căn chẵn chứa biểu thức lượng giác.',
      F`\cos u≠0 \text{ khi có } \tan u
\sin u≠0 \text{ khi có } \cot u`,
      ['Liệt kê điều kiện xác định cho từng phép toán.','Giải các phương trình làm mẫu hoặc hàm lượng giác không xác định.','Loại hợp các giá trị bị cấm, giữ giao của các điều kiện còn lại.'],
      ['Tìm tập xác định của y = tan(2x).',['Cần 2x ≠ π/2 + kπ.','Chia cả phần góc và bước kπ cho 2.'],'Loại x = π/4 + kπ/2 với k nguyên.'],
      mcq('Để y = cot(3x − π/6) xác định, cần loại họ giá trị nào?',['π/18 + kπ/3','π/6 + kπ','2π/9 + kπ/3','−π/18 + kπ/3'],0,'Cot không xác định khi 3x − π/6 = kπ. Cộng π/6 rồi chia 3.')),
    m('range','Tìm tập giá trị, giá trị lớn nhất và nhỏ nhất','Có hàm sin/cos kèm hệ số và tịnh tiến, hoặc có biểu thức theo sin x.',
      '−1 ≤ sin u ≤ 1; −1 ≤ cos u ≤ 1',
      ['Đặt t là sin u hoặc cos u và ghi miền của t.','Xét biểu thức còn lại theo t. Nếu tuyến tính, xét hai đầu mút và để ý hệ số âm.','Kiểm tra các giá trị t dùng để đạt cực trị có thể xảy ra trên miền x đề cho.'],
      ['Tìm khoảng giá trị của y = −4 cos 2x + 3 trên ℝ.',['Với t ∈ [−1; 1], −4t + 3 nhỏ nhất tại t = 1 và lớn nhất tại t = −1.'],'[−1; 7].'],
      short('Tìm giá trị nhỏ nhất của 4 − 7 sin(2x + π/3) trên ℝ.',-3,'Hệ số của sin âm. Giá trị nhỏ nhất đạt khi sin bằng 1, bằng 4 − 7 = −3.')),
    m('symmetry','Xét tính chẵn, lẻ','Đề hỏi tính đối xứng hoặc cho biểu thức kết hợp nhiều hàm.',
      'Chẵn: f(−x)=f(x)\nLẻ: f(−x)=−f(x)',
      ['Kiểm tra miền xác định đối xứng qua 0.','Tính f(−x) và rút gọn bằng tính chẵn của cos, tính lẻ của sin.','So sánh với f(x), −f(x). Nếu cả hai đẳng thức đều sai thì hàm không chẵn, không lẻ.'],
      ['Xét y = sin x cos 2x.',['Sin là hàm lẻ, cos 2x là hàm chẵn.','Thay −x, tích đổi dấu trên ℝ.'],'Hàm lẻ.'],
      mcq('Hàm số nào chẵn trên ℝ?',['sin x + cos x','sin x cos x','cos x + sin² x','sin 2x'],2,'Cos x chẵn và bình phương sin x cũng chẵn.')),
    m('period','Tìm chu kì và đọc đồ thị','Xác định khoảng lặp của đồ thị hoặc chu kì của một hàm đã đổi tần số.',
      F`T=\frac{2π}{|b|} \text{ với một hàm sin hoặc cos theo } bx+c`,
      ['Xác định hàm gốc và chu kì cơ bản của nó.','Chia chu kì gốc cho |b|. Hệ số trước hàm và độ dịch đứng không đổi chu kì khi biên độ khác 0.','Khi đọc hình, chọn hai vị trí cùng pha và cùng chiều biến thiên.'],
      ['Tìm chu kì của y = 5 cos(3x + 1).',['Hàm gốc cos có chu kì 2π, đối số thay đổi gấp 3.'],'2π/3.'],
      short('Chu kì của y = tan(πx/4) là bao nhiêu?',4,'Chu kì tan u là π. Chia π cho π/4 được 4.'))
  ],[
    tf('Cho f(x) = 1 + 2 cos(2x), với x thực.',[
      ['Đồ thị đối xứng qua trục Oy.',true,'Cos chẵn nên f(−x)=f(x).'],
      ['Chu kì dương nhỏ nhất bằng 2π.',false,'Hệ số của x là 2, nên chu kì cơ bản bằng π.'],
      ['Đồ thị nằm giữa hai đường y = −1 và y = 3.',true,'Từ −1 ≤ cos(2x) ≤ 1 suy ra −1 ≤ f(x) ≤ 3.'],
      ['Giá trị nhỏ nhất đạt tại x = 0.',false,'Tại x = 0, cos(2x)=1 nên f(0)=3 là giá trị lớn nhất.']
    ]),
    mcq('Hàm y = tan x + cot x loại những giá trị x nào?',['kπ','π/2 + kπ','kπ/2','π/4 + kπ/2'],2,'Loại nơi sin hoặc cos bằng 0. Hợp hai họ là kπ/2.'),
    short('Mực nước mô phỏng bởi h(t) = 4 + 2 cos(πt/6), với t tính theo giờ. Hai lần đạt đỉnh liên tiếp cách nhau bao nhiêu giờ?',12,'Chu kì là 2π chia cho π/6, được 12 giờ.')
  ],'sinGraphBu');

  l11(4,131,[
    ['Hai họ nghiệm đối với sin và cos',[
      'Kiểm tra |a| ≤ 1 trước khi giải sin u = a hoặc cos u = a. Khi a = ±1, hai họ theo công thức có thể trùng nhau.',
      'Viết nghiệm theo u trước, sau đó mới thay u = bx + c và giải theo x.'
    ],F`\sin u=\sin α ⇔ u=α+2kπ \text{ hoặc } u=π−α+2kπ
\cos u=\cos α ⇔ u=±α+2kπ, k∈ℤ`],
    ['Tan và cot',[
      'Dùng chu kì π và kiểm tra sin, cos khác 0 nếu biểu thức trước biến đổi có mẫu.',
      'Với bài đếm nghiệm, thay từng họ vào khoảng đề bài. Giữ đúng đầu mút mở/đóng và đếm nghiệm phân biệt.'
    ],F`\tan u=\tan α ⇔ u=α+kπ
\cot u=\cot α ⇔ u=α+kπ, k∈ℤ`]
  ],[
    m('sin-equation','Phương trình sin u = a','Vế phải là một số hoặc giá trị sin của góc đã biết.',
      F`\sin u=\sin α ⇔ u=α+2kπ \text{ hoặc }u=π−α+2kπ`,
      ['Kiểm tra a thuộc [−1; 1] rồi chọn α có sin α = a.','Viết hai họ nghiệm, gộp họ trùng khi a = 1 hoặc −1.','Đổi từ u sang x và lọc nghiệm theo khoảng nếu đề yêu cầu.'],
      ['Giải sin x = −1/2 trên [0; 2π).',['Góc mẫu có độ lớn π/6. Sin âm ở góc phần tư III và IV.'],'x = 7π/6 hoặc 11π/6.'],
      short('Phương trình sin(2x) = 1 có bao nhiêu nghiệm trong [0; 2π)?',2,'2x = π/2 + 2kπ. Suy ra x = π/4 + kπ, nhận k = 0, 1.')),
    m('cos-equation','Phương trình cos u = a','Hai góc cùng cosin đối nhau theo môđun 2π.',
      'cos u = cos α ⇔ u = ±α + 2kπ',
      ['Chọn α trong [0; π] có cos α = a.','Viết hai dấu ± rồi cộng chu kì 2π.','Lọc các họ nghiệm trên miền đề cho, gộp nếu trùng nhau.'],
      ['Giải cos x = −1/2 trên [0; 2π).',['Góc mẫu là 2π/3.','Góc đối trong đoạn là 4π/3.'],'x = 2π/3 hoặc 4π/3.'],
      short('Phương trình cos(3x) = 0 có bao nhiêu nghiệm trong [0; π)?',3,'3x = π/2 + kπ. Trên [0; 3π), 3x nhận π/2, 3π/2 và 5π/2.')),
    m('tan-equation','Phương trình tan u = a hoặc cot u = a','Cùng giá trị tan hoặc cot cho một họ nghiệm cách nhau π.',
      'u = α + kπ, k ∈ ℤ',
      ['Kiểm tra điều kiện của tan hoặc cot, chọn một góc mẫu α.','Viết một họ nghiệm theo u, sau đó giải cho x.','Nếu có giới hạn x, thay vào bất đẳng thức để tìm các k nguyên.'],
      ['Giải tan(2x) = 1 trên [0; π).',['2x = π/4 + kπ.','Suy ra x = π/8 + kπ/2. Lấy k = 0, 1.'],'x = π/8 hoặc 5π/8.'],
      mcq('Nghiệm dương nhỏ nhất của cot(2x) = −1 là gì?',['π/8','π/4','3π/8','5π/8'],2,'Góc dương nhỏ nhất có cot bằng −1 là 3π/4. Chia 2 được 3π/8.')),
    m('affine-sincos','Đưa a sin x + b cos x về một hàm','Phần mở rộng. Khi hai hệ số đi cùng một góc, chuẩn hóa để gộp thành một sin đổi pha.',
      F`R=\sqrt{a²+b²}
\cos φ=\frac{a}{R}, \sin φ=\frac{b}{R}
a\sin x+b\cos x=R\sin(x+φ)`,
      ['Tính R. Nếu R = 0, xét riêng phương trình 0 = c. Nếu |c| > R thì vô nghiệm.','Với R > 0, chọn φ thỏa đồng thời hai giá trị sin và cos. Thay vế trái thành R sin(x + φ).','Giải sin(x + φ) = c/R rồi trừ φ. Khi |c| = R chỉ có một nghiệm trong mỗi khoảng nửa kín dài 2π.'],
      ['Tìm số nghiệm của 6 sin x − 8 cos x = −10 trong [0; 2π).',['R = 10 và vế phải bằng −R.','Sin sau đổi pha phải bằng −1, xảy ra đúng một lần trong mỗi chu kì.'],'Một nghiệm.'],
      short('Tìm giá trị lớn nhất của m để 5 sin x + 12 cos x = m có nghiệm thực.',13,'Vế trái là một hàm sin có biên độ √(25 + 144) = 13. Giá trị lớn nhất đạt được bằng 13.')),
    m('reduce','Hạ bậc hoặc đặt ẩn phụ khi phương trình có bình phương','Sau khi biến đổi, chỉ giữ một hàm lượng giác để giải theo một ẩn.',
      't = sin x hoặc t = cos x, với −1 ≤ t ≤ 1',
      ['Dùng hệ thức cơ bản, hạ bậc hoặc đưa về tích để chỉ còn một hàm.','Đặt t và giải phương trình đại số. Loại giá trị t ngoài miền cho phép.','Giải các phương trình lượng giác còn lại. Lọc nghiệm và hợp các họ không trùng.'],
      ['Giải 2 cos² x − 3 cos x + 1 = 0 trong [0; 2π).',['Đặt t = cos x, phân tích (2t − 1)(t − 1) = 0.','Với t = 1/2 có hai nghiệm, với t = 1 có một nghiệm.'],'x = 0, π/3 hoặc 5π/3.'],
      short('Phương trình 2 sin² x + sin x − 1 = 0 có bao nhiêu nghiệm trên [0; 2π)?',3,'Đặt t = sin x. (2t − 1)(t + 1) = 0, nên t = 1/2 hoặc −1. Hai trường hợp lần lượt có 2 và 1 nghiệm.'))
  ],[
    tf('Xét phương trình cos x = 1/2 trên [0; 2π).',[
      ['π/3 là một nghiệm.',true,'Cos π/3 = 1/2.'],
      ['Mọi nghiệm đều thuộc góc phần tư I.',false,'Còn nghiệm 5π/3 ở góc phần tư IV.'],
      ['Trên ℝ có thể viết nghiệm x = ±π/3 + 2kπ.',true,'Áp dụng công thức nghiệm của phương trình cos.'],
      ['Hai nghiệm trong khoảng đã cho có tổng bằng π.',false,'Tổng π/3 + 5π/3 bằng 2π.']
    ]),
    short('Số nghiệm của sin x = cos x trên (0; 2π] là bao nhiêu?',2,'Cos x = 0 không là nghiệm, nên chia được cho cos x. Tan x = 1 cho π/4 và 5π/4.'),
    mcq('Với phương trình sin x = −1, họ nghiệm nào đúng?',['π/2 + 2kπ','−π/2 + 2kπ','−π/2 + kπ','π + 2kπ'],1,'Tung độ −1 ứng với điểm dưới cùng của đường tròn đơn vị.')
  ]);

  book('g6-b6',1,41,[
    ['Đọc lũy thừa',[
      'Lũy thừa a^n là tích của n thừa số đều bằng a khi n là số tự nhiên dương. a là cơ số, n là số mũ.',
      'Bình phương là lũy thừa bậc 2. Số chính phương là bình phương của một số tự nhiên. Với a khác 0, quy ước a^0 = 1.'
    ],'a² = a × a'],
    ['Các phép tính cùng cơ số',[
      'Khi nhân thì cộng số mũ. Khi chia thì trừ số mũ, với a khác 0 và số mũ của số bị chia lớn hơn hoặc bằng số mũ của số chia.',
      'Với cơ số lớn hơn 1, cùng cơ số thì lũy thừa có số mũ lớn hơn sẽ lớn hơn.'
    ],'a^m × a^n = a^{m+n}\na^m : a^n = a^{m−n}']
  ],[
    m('evaluate','Viết tích các thừa số giống nhau và tính lũy thừa','Đề yêu cầu nhận biết cơ số, số mũ hoặc tính giá trị.',
      'a³ = a × a × a',
      ['Đếm số thừa số bằng nhau, ghi thành số mũ.','Lấy giá trị của thừa số lặp làm cơ số.','Nếu cần tính, nhân đủ số thừa số rồi kiểm tra lại.'],
      ['Viết 4 × 4 × 4 × 4 dưới dạng lũy thừa rồi tính.',['Có bốn thừa số bằng 4.','Tính 4 × 4 = 16, rồi 16 × 16.'],'4^4 = 256.'],
      mcq('Tích 2 × 2 × 2 × 2 × 2 được viết là gì?',['5²','2^5','2 × 5','2^4'],1,'Số 2 là thừa số được lặp đúng năm lần.','recognize')),
    m('reverse','Viết một số thành lũy thừa có số mũ lớn hơn 1','Đề cho kết quả bằng một số tự nhiên và yêu cầu tìm cách viết.',
      '64 = 2^6 = 4³ = 8²',
      ['Thử cơ số từ các ước của số đã cho.','Nhân liên tiếp cơ số hoặc nhóm các thừa số bằng nhau trong một tích.','Thử lại giá trị và kiểm tra số mũ lớn hơn 1.'],
      ['Viết 216 dưới dạng lũy thừa bậc 3.',['Nhận thấy 6 × 6 = 36 và 36 × 6 = 216.'],'216 = 6³.'],
      short('Số 625 bằng lũy thừa bậc 4 của số tự nhiên nào?',5,'Ta có 5² = 25 và 25² = 625, nên 625 = 5^4.')),
    m('same-base','Nhân, chia và so sánh lũy thừa cùng cơ số','Các lũy thừa có thể được viết về cùng cơ số.',
      'a^m × a^n = a^{m+n}\na^m : a^n = a^{m−n}',
      ['Đổi về cùng cơ số nếu cần.','Khi nhân cộng số mũ, khi chia trừ số mũ.','Nếu so sánh, kiểm tra cơ số lớn hơn 1 trước khi so số mũ.'],
      ['So sánh 4³ và 2^5.',['4³ = (2²)³ = 2^6.','Cùng cơ số 2, số mũ 6 lớn hơn 5.'],'4³ > 2^5.'],
      short('Tìm số mũ n sao cho 5^9 : 5^3 × 5² = 5^n.',8,'Thực hiện phép chia rồi phép nhân từ trái sang phải. Số mũ bằng 9 − 3 + 2 = 8.')),
    m('unknown','Tìm số mũ hoặc cơ số chưa biết','Một lũy thừa trong đẳng thức có ô trống ở cơ số hoặc số mũ.',
      'Nếu a > 1 thì a^m = a^n ⇔ m = n.',
      ['Nếu chưa biết số mũ, viết hai vế về cùng cơ số lớn hơn 1.','Nếu chưa biết cơ số, đối chiếu các lũy thừa với số mũ đã cho trên tập số tự nhiên.','Thế giá trị tìm được vào đẳng thức.'],
      ['Tìm n biết 3^n = 81.',['81 = 3 × 3 × 3 × 3.','So sánh số mũ khi hai vế có cùng cơ số 3.'],'n = 4.'],
      short('Số tự nhiên x thỏa x³ = 343 bằng bao nhiêu?',7,'7 × 7 × 7 = 343. Lũy thừa bậc 3 tăng theo cơ số tự nhiên.')),
    m('square','Nhận biết và sử dụng số chính phương','Bài hỏi một số có thể là bình phương của số tự nhiên hay không.',
      '(n + 1)² − n² = 2n + 1',
      ['Thử các bình phương gần số cần kiểm tra.','Nếu nằm đúng tại một bình phương thì nêu cơ số.','Nếu nằm giữa hai bình phương liên tiếp thì loại. Có thể loại nhanh bằng chữ số cuối khi phù hợp.'],
      ['121 và 130, số nào là số chính phương?',['121 = 11².','121 < 130 < 144 = 12².'],'Chỉ 121.'],
      mcq('Số chính phương nhỏ nhất lớn hơn 150 là số nào?',['156','160','169','196'],2,'12² = 144 < 150 < 169 = 13².'))
  ],[
    short('Góc sân hình vuông được lát đúng 144 viên vuông bằng nhau, xếp thành các hàng đầy. Mỗi hàng có bao nhiêu viên?',12,'Gọi n là số viên một hàng. Số hàng cũng bằng n, nên n² = 144 và n = 12.'),
    tf('Xét các đẳng thức về lũy thừa.',[
      ['2³ có cơ số 2 và số mũ 3.',true,'Số viết dưới là cơ số, số viết phía trên là số mũ.'],
      ['3² × 3^4 = 3^8.',false,'Khi nhân cùng cơ số, số mũ bằng 2 + 4 = 6.'],
      ['2^6 : 2^6 = 1.',true,'Hai số bị chia và số chia bằng nhau, khác 0.'],
      ['27 là số chính phương.',false,'27 nằm giữa 5² = 25 và 6² = 36.']
    ])
  ]);

  book('g7-b3',1,24,[
    ['Lũy thừa của số hữu tỉ',[
      'Nếu cơ số âm, lũy thừa bậc chẵn dương và lũy thừa bậc lẻ âm. Phân biệt (−a)^n với −a^n.',
      'Khi lấy lũy thừa của phân số, nâng cả tử và mẫu lên cùng số mũ. Các biểu thức có số chia phải có mẫu khác 0.'
    ],F`(\frac{a}{b})^n=\frac{a^n}{b^n}, b≠0`],
    ['Quy tắc số mũ',[
      'Cộng hoặc trừ số mũ cho tích hoặc thương cùng cơ số. Lũy thừa của lũy thừa thì nhân các số mũ.'
    ],'(x^m)^n = x^{mn}\n(xy)^n = x^n y^n']
  ],[
    m('signed-power','Tính lũy thừa hoặc viết số hữu tỉ dưới dạng lũy thừa','Cơ số có thể âm hoặc là một phân số.',
      '(−a)^{2k} = a^{2k}\n(−a)^{2k+1} = −a^{2k+1}',
      ['Xác định dấu âm có nằm trong ngoặc của cơ số hay không.','Xét tính chẵn lẻ của số mũ.','Tính độ lớn rồi gắn dấu đúng.'],
      ['Tính (−2/3)³.',['Số mũ 3 lẻ nên kết quả âm.','Nâng tử và mẫu lên bậc 3.'],'−8/27.'],
      short('Tính (−3/2)^4.',81/16,'Số mũ chẵn nên kết quả dương. Tử là 81, mẫu là 16.','81/16')),
    m('same-base','Tích, thương và lũy thừa của lũy thừa','Dạng có nhiều lũy thừa cùng cơ số hoặc có lũy thừa lồng nhau.',
      'x^m × x^n = x^{m+n}\nx^m : x^n = x^{m−n}\n(x^m)^n = x^{mn}',
      ['Dùng ngoặc để xác định chính xác cơ số.','Xử lí lũy thừa lồng nhau trước bằng tích các số mũ.','Dùng tổng hoặc hiệu số mũ khi nhân hoặc chia.'],
      ['Rút gọn ((−2)²)³ : (−2)^4.',['Lũy thừa ngoài cho số mũ 2 × 3 = 6.','Chia cùng cơ số, lấy 6 − 4.'],'(−2)² = 4.'],
      short('Tính ((−3)²)³ : (−3)^5.',-3,'Số mũ còn 2 × 3 − 5 = 1. Cơ số vẫn là −3.')),
    m('same-exponent','Lũy thừa của tích và thương','Dùng khi có hai lũy thừa khác cơ số nhưng cùng số mũ.',
      F`a^n b^n=(ab)^n
\frac{a^n}{b^n}=(\frac{a}{b})^n, b≠0`,
      ['Kiểm tra số mũ ở hai thừa số hoặc hai vế của thương có bằng nhau.','Gộp cơ số bằng tích hoặc thương.','Thu gọn cơ số trước khi nâng lên lũy thừa.'],
      ['Tính (5/4)³ × (8/5)³.',['Gộp hai cơ số rồi rút gọn thành 2.'],'2³ = 8.'],
      short('Tính (−9/4)² : (3/2)².',9/4,'Chia hai cơ số được −3/2. Bình phương được 9/4.','9/4')),
    m('find','Tìm cơ số hoặc số mũ','Hai vế là những lũy thừa, một thành phần còn thiếu.',
      'Với |a| > 1, |a^n| tăng khi n tăng.',
      ['Khi tìm số mũ, so độ lớn sau khi đổi về cùng cơ số rồi kiểm tra dấu.','Khi tìm cơ số, xét cả dấu âm và dương nếu số mũ chẵn.','Thế lại và giữ các giá trị đúng với điều kiện của đề.'],
      ['Tìm các số hữu tỉ x thỏa x² = 49/64.',['7/8 có bình phương bằng 49/64.','Đổi dấu của cơ số vẫn cho cùng bình phương.'],'x = 7/8 hoặc −7/8.'],
      short('Có bao nhiêu số hữu tỉ x thỏa x^4 = 16/81?',2,'Hai nghiệm là 2/3 và −2/3. Mọi cơ số có độ lớn khác 2/3 đều không thỏa.')),
    m('compare','So sánh lũy thừa','Có thể đổi về cùng cơ số, cùng số mũ hoặc phân loại dấu trước.',
      'Nếu 0 < a < 1 thì a^m < a^n khi m > n.',
      ['Xét dấu. Một số âm luôn nhỏ hơn một số dương.','Với các số dương, đổi về cùng cơ số hoặc cùng số mũ khi có thể.','Khi cùng cơ số nằm giữa 0 và 1, lũy thừa có số mũ lớn hơn thì nhỏ hơn.'],
      ['So sánh (1/2)^4 và (1/4)³.',['Viết (1/4)³ = (1/2)^6.','Cơ số 1/2 nhỏ hơn 1 nên số mũ lớn hơn cho giá trị nhỏ hơn.'],'(1/2)^4 > (1/4)³.'],
      mcq('Số nào lớn nhất?',['(−3)^5','(1/3)^5','(1/3)^4','−3^4'],2,'Loại hai số âm. Với cơ số 1/3, số mũ 4 cho giá trị lớn hơn số mũ 5.','trap')),
    m('units','Chữ số tận cùng của lũy thừa','Dạng mở rộng cho lũy thừa của số nguyên dương với số mũ lớn.',
      'Chữ số tận cùng chỉ phụ thuộc chữ số tận cùng của cơ số.',
      ['Tính các chữ số cuối từ lũy thừa bậc 1 đến khi thấy chu kì lặp.','Chia số mũ cho độ dài chu kì.','Dùng số dư làm vị trí, nếu dư 0 thì lấy chữ số cuối chu kì.'],
      ['Tìm chữ số tận cùng của 7^34.',['Chu kì của 7 là 7, 9, 3, 1.','34 chia 4 dư 2.'],'Chữ số 9.'],
      short('Chữ số tận cùng của 3^{2032} bằng bao nhiêu?',1,'Chu kì là 3, 9, 7, 1. 2032 chia 4 dư 0 nên lấy cuối chu kì.'))
  ],[
    tf('Đánh giá các quy tắc với lũy thừa của số hữu tỉ.',[
      ['(−2)^6 có giá trị dương.',true,'Số mũ chẵn.'],
      ['(3²)^4 = 3^6.',false,'Phải nhân số mũ, được 3^8.'],
      ['(1/5)^3 < (1/5)^2.',true,'Cơ số giữa 0 và 1.'],
      ['(2/3)² × (3/2)³ = 1.',false,'Hai số mũ khác nhau. Rút gọn còn 3/2.']
    ])
  ]);

  book('g8-b3',1,21,[
    ['Cộng, trừ và thu gọn',[
      'Hai hạng tử chỉ cộng gộp được nếu có cùng phần biến, bao gồm số mũ của từng biến.',
      'Khi có dấu trừ trước ngoặc, đổi dấu của mọi hạng tử bên trong. Sau khi thu gọn, bậc của đa thức có thể giảm.'
    ],'P − (A + B − C) = P − A − B + C'],
    ['Lập đa thức diện tích',[
      'Ghi độ dài mỗi cạnh bằng biểu thức phù hợp. Nếu hình có phần khoét, diện tích còn lại bằng diện tích toàn bộ trừ phần bị cắt.',
      'Điều kiện kích thước dương phải thỏa trước khi diễn giải kết quả hình học.'
    ],'S hình chữ nhật = chiều dài × chiều rộng']
  ],[
    m('sum-difference','Tính tổng hoặc hiệu hai đa thức','Bỏ ngoặc và nhóm các hạng tử có cùng phần biến.',
      '−(A + B − C) = −A − B + C',
      ['Ghi rõ biểu thức đang tính là P + Q hay P − Q.','Bỏ ngoặc, đổi dấu tất cả hạng tử của Q nếu trừ.','Gộp hạng tử đồng dạng, kiểm tra hạng tử nào bị triệt tiêu.'],
      ['Tính (4x² − x + 2) − (3x² + 2x − 5).',['Bỏ ngoặc thứ hai được −3x² − 2x + 5.','Cộng các hệ số cùng phần biến.'],'x² − 3x + 7.'],
      mcq('Hiệu (5x² + 3xy) − (5x² − xy + 2) bằng gì?',['2xy − 2','4xy + 2','4xy − 2','10x² + 4xy − 2'],2,'5x² triệt tiêu. Hạng tử −xy trong ngoặc đổi thành +xy, còn +2 đổi thành −2.')),
    m('unknown-poly','Tìm đa thức chưa biết trong đẳng thức','Cô lập đa thức cần tìm trước khi thực hiện phép tính.',
      'P + Q = R ⇔ P = R − Q\nP − Q = R ⇔ Q = P − R',
      ['Xác định đa thức cần tìm đang là số hạng hay số trừ.','Chuyển vế đúng phép toán, đặt ngoặc quanh đa thức được trừ.','Thu gọn rồi thế vào đẳng thức ban đầu.'],
      ['Tìm Q biết (x² + 3x) − Q = 2x − 1.',['Q = (x² + 3x) − (2x − 1).','Đổi dấu 2x − 1 rồi cộng.'],'Q = x² + x + 1.'],
      short('Nếu P − (2x² − 4x + 1) = x² + 3x − 5, hệ số của x trong P là bao nhiêu?',-1,'Cộng đa thức trong ngoặc vào hai vế. Hệ số của x là −4 + 3 = −1.')),
    m('multiple','Dùng cộng trừ đa thức để nhận ra nhân tử chung','Cần xác định biểu thức sau thu gọn có chia hết cho một đơn thức hay không.',
      'xA + xB = x(A + B)',
      ['Thu gọn hoàn toàn tổng hoặc hiệu để thấy hạng tử nào còn lại.','Kiểm tra từng hạng tử còn lại có chung nhân tử được hỏi.','Đặt nhân tử đó ra ngoài hoặc chỉ ra hạng tử khiến phép chia không hết.'],
      ['Biểu thức (3x² + 4x + 2) − (x² − 5x + 2) có chia hết cho x không?',['Hai hằng số 2 triệt tiêu.','Kết quả 2x² + 9x = x(2x + 9).'],'Có.'],
      mcq('Để (2x² − 3x + k) − (x² + x + 6) chia hết cho x, chọn k bằng bao nhiêu?',['−6','0','6','4'],2,'Sau thu gọn, hằng số k − 6 phải bằng 0.')),
    m('area','Lập đa thức từ hình ghép hoặc hình bị khoét','Biểu thức độ dài gắn với hình, cần tìm diện tích hoặc hệ số của đa thức diện tích.',
      'S còn lại = S toàn bộ − S phần khoét',
      ['Chọn hình đơn giản bao ngoài và ghi hai kích thước của nó.','Tính phần khoét theo đúng kích thước.','Trừ hai đa thức diện tích rồi gộp hạng tử đồng dạng.'],
      ['Hình vuông cạnh x + 3 bị khoét một hình vuông cạnh x ở góc. Tính diện tích còn lại.',['Diện tích ban đầu là (x + 3)².','Lấy (x + 3)² − x².'],'6x + 9.'],
      short('Hình chữ nhật có hai cạnh x + 6 và x + 4. Cắt một hình chữ nhật cạnh x và x + 2. Hệ số của x trong diện tích phần còn lại là bao nhiêu?',8,'Toàn bộ là x² + 10x + 24. Phần cắt là x² + 2x. Hiệu bằng 8x + 24.'))
  ],[
    tf('Cho P = 3x² − xy + 5 và Q = x² + 2xy − 5.',[
      ['Hệ số của xy trong P + Q là 1.',true,'−1 + 2 = 1.'],
      ['Hệ số tự do của P − Q bằng 0.',false,'5 − (−5) = 10.'],
      ['P + Q có bậc 2.',true,'Sau thu gọn là 4x² + xy.'],
      ['Hệ số của xy trong Q − P là −3.',false,'2 − (−1) = 3.']
    ])
  ]);

  book('g8-b15',1,99,[
    ['Định lí và định lí đảo',[
      'Với M thuộc cạnh AB, N thuộc cạnh AC, nếu MN song song BC thì các đoạn tương ứng trên hai cạnh tỉ lệ.',
      'Nếu AM/AB = AN/AC với M, N nằm trong hai cạnh tương ứng thì MN song song BC. Dùng định lí đảo khi kết luận cần chứng minh là song song.'
    ],F`\frac{AM}{AB}=\frac{AN}{AC}=\frac{MN}{BC}
\frac{AM}{MB}=\frac{AN}{NC}`],
    ['Ghép đúng phần và toàn bộ',[
      'AM và AN cùng tính từ A. Nếu một vế dùng tỉ số phần trên toàn cạnh thì vế kia cũng phải như vậy. Nếu đề cho AM và MB, cộng để lấy AB khi cần.'
    ],'AB = AM + MB']
  ],[
    m('ratio','Tìm tỉ số của các đoạn thẳng','Đề cho độ dài hai đoạn hoặc cho một tỉ số cần đổi sang phần khác.',
      F`\frac{AM}{AB}=\frac{AM}{AM+MB}`,
      ['Xác định hai đoạn mà đề yêu cầu lập tỉ số.','Đổi về cùng đơn vị và tính đoạn còn thiếu từ quan hệ điểm nằm giữa.','Lập phân số theo đúng thứ tự rồi rút gọn.'],
      ['M nằm giữa A và B, AM = 3 cm, MB = 5 cm. Tính AM/AB.',['AB = 3 + 5 = 8 cm.'],'3/8.'],
      short('Điểm M nằm giữa A và B. Biết AM = 6 cm và AM/AB = 3/7. Tính MB theo cm.',8,'AB = 6 × 7/3 = 14 cm. MB = 14 − 6 = 8 cm.')),
    m('length','Tính độ dài bằng định lí Thalès','Đã có hai đường song song và cần tìm một độ dài.',
      F`\frac{AM}{AB}=\frac{AN}{AC}`,
      ['Chỉ ra MN song song BC và xác định đỉnh chung A.','Viết tỉ số tương ứng phần trên toàn cạnh, hoặc phần trên phần còn lại.','Giải phương trình cho độ dài chưa biết rồi kiểm tra độ dài phải dương.'],
      ['MN song song BC. AM = 4, AB = 10, AC = 15. Tìm AN.',['AN/AC = AM/AB = 4/10.','AN = 15 × 4/10.'],'AN = 6.'],
      short('Trong tam giác ABC, M thuộc AB, N thuộc AC và MN song song BC. AM = 4, MB = 2, NC = 5. Tìm AN.',10,'AM/MB = AN/NC. Thay số, AN = 5 × 4/2 = 10.')),
    m('relation','Chứng minh hệ thức bằng các tỉ số tương ứng','Kết luận cần chứng minh là một đẳng thức tỉ số hay tích độ dài.',
      'AM × AC = AN × AB khi MN song song BC.',
      ['Tìm cặp đường song song tạo ra tỉ số chứa các đoạn cần dùng.','Viết đẳng thức tỉ số rồi nhân chéo hoặc thay tỉ số tương đương.','Đối chiếu từng thừa số với kết luận cần chứng minh.'],
      ['Với MN song song BC, chứng minh AM × AC = AN × AB.',['Áp dụng AM/AB = AN/AC.','Nhân hai vế với AB × AC.'],'Thu được AM × AC = AN × AB.'],
      mcq('Nếu MN song song BC, đẳng thức nào suy ra từ AM/MB = AN/NC?',['AM × AN = MB × NC','AM × NC = AN × MB','AM × MB = AN × NC','AM × NC = MB × NC'],1,'Nhân chéo tỉ số AM/MB = AN/NC.')),
    m('parallel','Chứng minh hai đường thẳng song song','Đề cho đủ các độ dài để kiểm tra hai tỉ số tương ứng.',
      F`\frac{AM}{AB}=\frac{AN}{AC}⇒MN∥BC`,
      ['Kiểm tra M, N nằm trên hai cạnh của cùng một tam giác.','Lập và rút gọn hai tỉ số cùng kiểu.','Nếu bằng nhau, áp dụng định lí Thalès đảo để kết luận.'],
      ['AM = 2, MB = 3, AN = 4, NC = 6. Hỏi MN có song song BC không?',['AM/MB = 2/3 và AN/NC = 4/6 = 2/3.','Hai điểm nằm trên hai cạnh nên áp dụng định lí đảo.'],'MN ∥ BC.'],
      mcq('Với AM = 5, MB = 7, AN = 10, cần NC bằng bao nhiêu để MN song song BC?',['12','14','17','24'],1,'Cần 5/7 = 10/NC. Nhân chéo cho NC = 14.'))
  ],[], 'thalesMN');

  book('g9-b2',1,18,[
    ['Giải hệ bằng biến đổi tương đương',[
      'Phương pháp thế cô lập một ẩn rồi thay vào phương trình còn lại. Phương pháp cộng đại số triệt tiêu một ẩn bằng cộng hoặc trừ hai phương trình.',
      'Nhân hai vế của một phương trình với cùng số khác 0 không làm đổi tập nghiệm. Sau khi tìm một ẩn, thế lại để tìm ẩn kia.'
    ],'y = ax + b có thể thế vào phương trình còn lại.'],
    ['Biện luận và kiểm tra',[
      'Nếu khử ẩn dẫn đến 0 = số khác 0, hệ vô nghiệm. Nếu thu được 0 = 0, quay về một phương trình còn lại để mô tả nghiệm.',
      'Hệ có nghiệm duy nhất khi hai đường thẳng biểu diễn hai phương trình cắt nhau.'
    ],'']
  ],[
    m('substitution','Giải hệ bằng phương pháp thế','Ưu tiên khi một ẩn đã được cô lập hoặc có hệ số 1 hay −1.',
      'Nếu y = ax + b, thay y bằng ax + b.',
      ['Rút một ẩn từ một phương trình.','Thế biểu thức vào phương trình kia rồi giải phương trình một ẩn.','Tính ẩn còn lại và thử cặp nghiệm vào hai phương trình.'],
      ['Giải hệ y = x + 1 và 2x + y = 10.',['Thế vào phương trình thứ hai được 3x + 1 = 10.','Suy ra x = 3, y = 4.'],'(3; 4).'],
      short('Cho hệ y = 3x − 2 và 4x + y = 19. Tìm y.',7,'Thế y vào 4x + y = 19 được 7x − 2 = 19, nên x = 3 và y = 7.')),
    m('elimination','Giải hệ bằng cộng đại số','Chọn khi hệ số của một ẩn đã bằng nhau, đối nhau hoặc dễ quy đồng.',
      'ax + by = c; dx − by = e ⇒ (a+d)x = c+e',
      ['Chọn ẩn cần khử. Nhân phương trình nếu cần để hai hệ số bằng hoặc đối nhau.','Cộng nếu hai hệ số đối nhau, trừ nếu chúng bằng nhau.','Giải rồi thế ngược. Kiểm tra dấu khi trừ toàn bộ một phương trình.'],
      ['Giải hệ 2x + 3y = 12 và 4x − 3y = 6.',['Cộng hai phương trình được 6x = 18.','Thế x = 3 vào phương trình đầu.'],'(3; 2).'],
      short('Cho hệ 3x + 2y = 16 và 5x − 2y = 16. Tính x + y.',6,'Cộng hai phương trình được 8x = 32, nên x = 4. Thế vào phương trình đầu được y = 2.')),
    m('auxiliary','Giải hệ bằng đặt ẩn phụ','Hai biểu thức giống nhau lặp lại, hoặc hai ẩn xuất hiện dưới dạng nghịch đảo.',
      'Đặt u = 1/x, v = 1/y khi x và y khác 0.',
      ['Ghi điều kiện cho biểu thức ban đầu rồi đặt hai ẩn phụ.','Giải hệ bậc nhất theo ẩn phụ.','Đổi về ẩn ban đầu và loại giá trị không thỏa điều kiện.'],
      ['Giải hệ 1/x + 1/y = 1 và 1/x − 1/y = 0.',['Đặt u = 1/x, v = 1/y. Cộng hai phương trình được u = 1/2, rồi v = 1/2.','Đổi ngược về x và y.'],'(2; 2).'],
      short('Với x,y khác 0, cho 1/x + 1/y = 5/6 và 1/x − 1/y = 1/6. Tính x + y.',5,'Giải hệ theo u = 1/x, v = 1/y được u = 1/2 và v = 1/3. Vậy x + y = 2 + 3 = 5.')),
    m('intersection','Tìm giao điểm của hai đường thẳng','Tọa độ giao điểm thỏa cả hai phương trình của các đường.',
      'y = ax + b và y = cx + d ⇒ ax + b = cx + d',
      ['Viết hai phương trình theo x và y.','Giải hệ hoặc cho hai biểu thức của y bằng nhau.','Thế để tìm y, rồi ghi kết quả theo thứ tự (x; y).'],
      ['Tìm giao điểm y = 2x − 3 và y = −x + 6.',['Giải 2x − 3 = −x + 6 được x = 3.','Thế được y = 3.'],'(3; 3).'],
      short('Tìm tung độ giao điểm của y = 3x + 2 và y = x + 8.',11,'Cho hai vế bằng nhau được 2x = 6, x = 3. Thế vào một trong hai đường, y = 11.')),
    m('parameter','Xét số nghiệm khi hệ chứa tham số','Đề hỏi giá trị của tham số để hệ có một nghiệm, vô nghiệm hoặc vô số nghiệm.',
      'ax + by = c; a′x + b′y = c′',
      ['Khử một ẩn hoặc xét quan hệ tỉ lệ giữa hai hàng hệ số.','Nếu hệ số còn lại khác 0 thì giải để được nghiệm duy nhất.','Với giá trị làm hệ số bằng 0, thế riêng để phân biệt mâu thuẫn và trùng phương trình.'],
      ['Xét x + y = 3 và mx + 2y = 6. Khi nào hệ có vô số nghiệm?',['Trừ hai lần phương trình đầu từ phương trình sau, được (m − 2)x = 0.','Khi m = 2, hai phương trình tương đương.'],'m = 2.'],
      mcq('Hệ x + y = 4 và mx + 2y = 9 vô nghiệm khi nào?',['m = 0','m = 1','m = 2','m = 4'],2,'Khi m = 2, vế trái của phương trình sau gấp đôi phương trình đầu nhưng vế phải 9 khác 8.'))
  ],[
    tf('Cho hệ x + 2y = 7 và 2x − y = 4.',[
      ['Có thể rút x = 7 − 2y từ phương trình đầu.',true,'Chuyển 2y sang vế phải.'],
      ['Cộng nguyên hai phương trình sẽ khử được y.',false,'Hệ số của y sau khi cộng là 1.'],
      ['Cặp (3; 2) là nghiệm.',true,'Thế được 3 + 4 = 7 và 6 − 2 = 4.'],
      ['Hai đường thẳng của hệ song song.',false,'Hệ có nghiệm duy nhất, hai đường thẳng cắt nhau.']
    ])
  ]);

  l10(2,45,[
    ['Tập hợp và tập con',[
      'Hai tập hợp bằng nhau khi chứa đúng các phần tử như nhau. Khi liệt kê, viết mỗi phần tử một lần.',
      'A là tập con của B khi mọi phần tử của A đều thuộc B. Tập rỗng là tập con của mọi tập hợp.',
      'Mỗi phần tử của tập có n phần tử có hai lựa chọn vào hoặc không vào tập con. Vì vậy có 2^n tập con, kể cả chính tập đó.'
    ],'A = B ⇔ A ⊂ B và B ⊂ A\nSố tập con thực sự = 2^n − 1'],
    ['Phép toán và điểm biên',[
      'Giao giữ phần tử chung. Hợp giữ phần tử thuộc ít nhất một tập. Hiệu A ∖ B giữ phần tử của A không thuộc B.',
      'Với khoảng và đoạn trên trục số, kiểm tra từng đầu mút bằng kí hiệu tròn hoặc vuông. Khi đếm số nguyên, lập danh sách các số tại và giữa hai đầu mút.'
    ],'A ∩ B = {x | x ∈ A và x ∈ B}\nA ∖ B = {x | x ∈ A và x ∉ B}']
  ],[
    m('listing','Mô tả tập hợp bằng cách liệt kê hoặc nêu tính chất','Đề cho điều kiện của phần tử, yêu cầu viết dưới dạng tập hợp.',
      'A = {x ∈ ℤ | điều kiện của x}',
      ['Đọc tập số mà x thuộc, ví dụ ℤ hoặc ℕ.','Giải điều kiện và kiểm tra các đầu mút.','Liệt kê đúng phần tử, mỗi phần tử chỉ viết một lần.'],
      ['Liệt kê A = {x ∈ ℤ | −2 < x ≤ 2}.',['Chỉ nhận số nguyên, loại −2 và nhận 2.'],'A = {−1; 0; 1; 2}.'],
      short('Tập {x ∈ ℤ | −4 ≤ x < 1} có bao nhiêu phần tử?',5,'Các phần tử là −4, −3, −2, −1 và 0.')),
    m('subset','Tập con và số tập con','Đề hỏi chứa nhau hay đếm những tập con thỏa thêm điều kiện.',
      'Có 2^n tập con của tập n phần tử.',
      ['Với quan hệ chứa nhau, kiểm tra mọi phần tử của tập con dự kiến.','Với đếm tập con, tách những phần tử bắt buộc có hoặc bắt buộc vắng.','Mỗi phần tử còn tự do có hai lựa chọn. Bỏ tập gốc nếu hỏi tập con thực sự.'],
      ['Tập {a; b; c; d} có bao nhiêu tập con chứa a và không chứa d?',['a và d đã cố định.','b và c mỗi phần tử có hai lựa chọn.'],'2² = 4.'],
      short('Tập có 6 phần tử. Có bao nhiêu tập con chứa một phần tử a đã chỉ định và đồng thời là tập con thực sự?',31,'Giữ a, còn 5 phần tử tự do nên có 32 tập con chứa a. Bỏ tập ban đầu được 31.')),
    m('set-operations','Giao, hợp và hiệu của tập hợp','Phân biệt chính xác “cả hai”, “ít nhất một” và “thuộc A nhưng không thuộc B”.',
      'A ∪ B = {x | x ∈ A hoặc x ∈ B}',
      ['Đánh dấu phần thuộc A và B riêng.','Giao lấy phần chồng nhau, hợp lấy toàn bộ, hiệu xóa phần B khỏi A.','Kiểm tra các đầu mút có thuộc từng tập hay không.'],
      ['Tính [−2; 4] ∖ (1; 5).',['Mọi điểm lớn hơn 1 trong đoạn đều bị xóa.','Điểm 1 không thuộc tập trừ nên vẫn giữ.'],'[−2; 1].'],
      mcq('Giao của (−3; 2] và [−1; 5) là tập nào?',['(−1; 2)','[−1; 2]','[−1; 2)','(−3; 5)'],1,'Phần chung từ −1 đến 2, cả hai đầu đều thuộc cả hai tập.'))
  ],[
    tf('Cho A = {1; 2; 3} và B = {2; 4}.',[
      ['A ∩ B = {2}.',true,'2 là phần tử duy nhất xuất hiện trong cả hai.'],
      ['A ∪ B có 5 phần tử.',false,'Phần tử 2 được tính một lần, hợp có 4 phần tử.'],
      ['A ∖ B = {1; 3}.',true,'Xóa 2 khỏi A, còn 1 và 3.'],
      ['B là tập con của A.',false,'4 thuộc B nhưng không thuộc A.']
    ])
  ]);

  l10(6,176,[
    ['Quy ước và định lí cosin',[
      'a, b, c đối diện lần lượt A, B, C. Khi biết hai cạnh và góc xen giữa, dùng cosin tìm cạnh còn lại. Khi biết ba cạnh, cô lập cosin của góc cần tìm.',
      'Cosin dương, bằng 0, âm tương ứng góc nhọn, vuông, tù.'
    ],F`a²=b²+c²−2bc\cos A
\cos A=\frac{b²+c²−a²}{2bc}`],
    ['Định lí sin và diện tích',[
      'Dùng định lí sin khi có cặp cạnh – góc đối diện. Nếu biết sin của góc mà chưa biết góc nhọn hay tù, xét hai góc bù nhau rồi kiểm tra tổng góc.',
      'Dùng diện tích theo hai cạnh và góc xen giữa hoặc công thức Heron khi biết ba cạnh. Với tam giác đều, có thể suy ra từ góc 60°.'
    ],F`\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R
S=\frac{bc\sin A}{2}=\sqrt{p(p−a)(p−b)(p−c)}
p=\frac{a+b+c}{2}`]
  ],[
    m('cosine','Tính cạnh hoặc góc bằng định lí cosin','Hai cạnh và góc xen giữa, hoặc ba cạnh đã biết.',
      F`a²=b²+c²−2bc\cos A`,
      ['Ghép đúng cạnh đối diện với góc cần dùng.','Thế vào công thức, cô lập cạnh bình phương hoặc cosin.','Lấy căn dương cho độ dài. Nếu tìm góc, chọn góc trong (0°; 180°).'],
      ['Biết b = 5, c = 8, A = 60°. Tính a.',['a² = 25 + 64 − 2 × 5 × 8 × 1/2 = 49.'],'a = 7.'],
      short('Tam giác có a = 7, b = 5, c = 6. Tính cos A.',.2,'Cos A = (25 + 36 − 49)/(2 × 5 × 6) = 12/60 = 1/5.','1/5')),
    m('sine','Tìm cạnh, góc hoặc bán kính bằng định lí sin','Tối thiểu có một cặp cạnh và góc đối diện đã biết.',
      F`a=2R\sin A`,
      ['Ghi cặp cạnh – góc đã biết.','Đổi từ tỉ số của cặp đã biết sang cặp đang tìm.','Nếu tìm góc qua sin, kiểm tra cả góc bù và tổng ba góc khi phù hợp.'],
      ['Biết a = 8 cm, A = 30°. Tính R.',['8/sin 30° = 16 là đường kính 2R.'],'R = 8 cm.'],
      short('Cho A = 30°, B = 90° và a = 5 cm. Tính b theo cm.',10,'b/sin 90° = 5/sin 30° = 10. Vì sin 90° = 1, b = 10.')),
    m('area','Tính diện tích tam giác','Chọn công thức theo dữ kiện có góc xen giữa hay đã biết cả ba cạnh.',
      F`S=\frac{bc\sin A}{2}
S \text{ (tam giác đều)}=\frac{a²\sqrt{3}}{4}`,
      ['Nếu biết hai cạnh và góc xen giữa, dùng nửa tích hai cạnh nhân sin góc.','Nếu biết ba cạnh, tính nửa chu vi rồi áp dụng Heron.','Giữ đơn vị bình phương và chỉ làm tròn ở bước cuối.'],
      ['Tam giác đều cạnh 6 cm có diện tích bao nhiêu?',['Dùng S = 6 × 6 × sin 60° / 2.'],'9√3 cm².'],
      short('Tam giác có cạnh 5, 12 và 13 cm. Tính diện tích theo cm².',30,'5² + 12² = 13² nên góc xen giữa 5 và 12 là góc vuông. Diện tích bằng 5 × 12/2 = 30.'))
  ],[
    mcq('Tam giác có a² > b² + c². Góc A thuộc loại nào?',['Nhọn','Vuông','Tù','Bẹt'],2,'Theo định lí cosin, cos A < 0 nên A là góc tù.')
  ],'sinCosTriangle');

  book('g12-b1',1,15,[
    ['Tính đơn điệu và bảng dấu',[
      'Xét các khoảng thuộc tập xác định. Nếu đạo hàm dương trên một khoảng thì hàm đồng biến trên khoảng đó. Nếu âm thì hàm nghịch biến.',
      'Điểm làm đạo hàm bằng 0 và điểm hàm không xác định đều có thể chia bảng thành các khoảng. Giá trị x ngoài tập xác định không thể là điểm cực trị.'
    ],'f′(x) > 0 ⇒ f đồng biến\nf′(x) < 0 ⇒ f nghịch biến'],
    ['Cực trị và nghiệm bội',[
      'Nếu f liên tục tại x₀ và đạo hàm đổi từ dương sang âm khi qua x₀ thì f đạt cực đại tại x₀. Đổi từ âm sang dương thì đạt cực tiểu.',
      'Phân biệt điểm cực trị x₀, giá trị cực trị f(x₀) và điểm (x₀; f(x₀)) trên đồ thị. Đạo hàm bằng 0 mà giữ dấu hai bên thì không có cực trị ở đó.'
    ],'']
  ],[
    m('intervals','Tìm khoảng đồng biến và nghịch biến','Từ biểu thức hàm hoặc bảng dấu của đạo hàm, xác định các khoảng có cùng dấu.',
      'Điểm loại khỏi tập xác định phải tách khoảng.',
      ['Tìm tập xác định và tính f′.','Đánh dấu các nghiệm f′ = 0 và những điểm bị loại.','Xét dấu trên từng khoảng, đọc khoảng đồng biến/nghịch biến theo yêu cầu.'],
      ['Xét y = x³ − 3x. Tìm khoảng nghịch biến.',['f′(x) = 3(x² − 1).','Đạo hàm âm khi −1 < x < 1.'],'(−1; 1).'],
      mcq('Nếu f′(x) = (x − 2)(x + 1) trên ℝ, f nghịch biến trên khoảng nào?',['(−∞; −1)','(−1; 2)','(2; +∞)','(−∞; 2)'],1,'Giữa hai nghiệm, hai nhân tử trái dấu. Ngoài khoảng đó, tích dương.')),
    m('extrema','Tìm cực trị từ sự đổi dấu của đạo hàm','Đề cho biểu thức f′, đồ thị f′ hoặc bảng biến thiên.',
      '+ → − cho cực đại. − → + cho cực tiểu.',
      ['Liệt kê những điểm có thể là cực trị thuộc tập xác định.','Đọc dấu f′ ngay bên trái và phải từng điểm.','Chỉ giữ điểm có đổi dấu, rồi tính f(x₀) nếu hỏi giá trị cực trị.'],
      ['Cho f′(x) = (x + 2)²(x − 1). Hàm có cực trị ở đâu?',['Tại −2 nhân tử bình phương không đổi dấu.','Tại 1, dấu chuyển từ âm sang dương.'],'Cực tiểu tại x = 1.'],
      short('Cho f′(x) = (x + 3)(x − 1)²(x − 4) trên ℝ. Có bao nhiêu điểm cực trị?',2,'Dấu đổi tại −3 và 4. Nhân tử bình phương tại 1 không làm đổi dấu.')),
    m('parameter','Tìm tham số để hàm số đồng biến trên ℝ','Với đạo hàm là tam thức bậc hai, điều kiện là đạo hàm không âm trên ℝ.',
      'Nếu a > 0, ax² + bx + c ≥ 0 với mọi x khi Δ ≤ 0.',
      ['Tính đạo hàm và xác định hệ số bậc hai.','Xét điều kiện đạo hàm không âm với mọi x.','Kiểm tra trường hợp bằng 0 tại điểm riêng lẻ hoặc đạo hàm đồng nhất bằng 0.'],
      ['Tìm m để f(x) = x³ + mx đồng biến trên ℝ.',['f′(x) = 3x² + m có giá trị nhỏ nhất bằng m.','Với m = 0, đạo hàm chỉ bằng 0 tại 0.'],'m ≥ 0.'],
      short('Tìm m nhỏ nhất để f(x) = x³ − 6x² + mx đồng biến trên ℝ.',12,'f′(x) = 3(x − 2)² + m − 12. Giá trị nhỏ nhất là m − 12 nên cần m ≥ 12.'))
  ],[
    tf('Cho f′(x) = (x + 1)(x − 3) trên ℝ.',[
      ['Hàm đồng biến trên (3; +∞).',true,'Hai nhân tử đều dương khi x > 3.'],
      ['Hàm nghịch biến trên (−∞; −1).',false,'Hai nhân tử đều âm nên tích dương trên khoảng này.'],
      ['Hàm có cực đại tại x = −1.',true,'Đạo hàm đổi từ dương sang âm qua −1.'],
      ['Giá trị cực tiểu của hàm chắc chắn bằng 3.',false,'3 là hoành độ điểm cực tiểu. Chưa biết f(3).']
    ])
  ]);

  book('g12-b13',1,458,[
    ['Diện tích từ tích phân',[
      'Với hai đồ thị y = f(x), y = g(x) và hai biên x = a, x = b, diện tích là tích phân của |f − g|. Nếu chỉ có một đồ thị và trục Ox, đặt g = 0.',
      'Phải chia khoảng tại những giao điểm mà thứ tự trên – dưới thay đổi. Diện tích mỗi phần là số không âm.'
    ],F`S=\int_a^b |f(x)−g(x)| dx`],
    ['Thể tích khối tròn xoay',[
      'Quay miền giới hạn bởi y = f(x), trục Ox và hai đường thẳng đứng quanh Ox tạo thiết diện tròn bán kính |f(x)|.',
      'Nếu thiết diện là vành khăn, lấy π nhân hiệu bình phương bán kính ngoài và bán kính trong.'
    ],F`V=π\int_a^b (f(x))² dx`]
  ],[
    m('axis-area','Diện tích giữa đồ thị và trục Ox','Dùng khi đề cho miền dưới hoặc trên một đồ thị, có thể đổi dấu qua trục.',
      F`S=\int_a^b|f(x)| dx`,
      ['Tìm nghiệm f(x)=0 nằm trong khoảng.','Xét dấu f và chia miền thành các phần có dấu cố định.','Lấy tích phân với dấu thích hợp rồi cộng các diện tích.'],
      ['Tính diện tích giữa y = x − 1 và trục Ox trên [0; 3].',['Đồ thị cắt trục tại x = 1.','Hai tam giác có diện tích 1/2 và 2.'],'5/2.'],
      short('Diện tích giữa y = 2x − 4 và trục Ox trên [0; 3] bằng bao nhiêu?',5,'Chia tại x = 2. Hai phần là tam giác đáy 2 cao 4 và đáy 1 cao 2. Tổng bằng 4 + 1 = 5.')),
    m('two-curves','Diện tích miền giới hạn bởi hai đồ thị','Đề cho hai hàm và yêu cầu xác định giao điểm hoặc miền kín.',
      F`S=\int_a^b|f(x)−g(x)| dx`,
      ['Giải f(x)=g(x) để tìm các mốc giao nhau.','So sánh hai hàm trên mỗi khoảng giữa các mốc.','Lấy tích phân hàm trên trừ hàm dưới và cộng các miền.'],
      ['Tính diện tích giữa y = x và y = x² trên [0; 1].',['Hai hàm bằng nhau tại 0 và 1.','Giữa hai mốc, x ≥ x². Tích phân x − x² bằng 1/2 − 1/3.'],'1/6.'],
      short('Tính diện tích miền kín bởi y = 4x và y = x².',32/3,'Giao điểm có x = 0 và 4. Trên [0; 4], 4x ≥ x². Tích phân bằng 32 − 64/3 = 32/3.','32/3')),
    m('volume','Thể tích khối tròn xoay quanh Ox','Tưởng tượng lát cắt vuông góc Ox để xác định bán kính.',
      F`V=π\int_a^b R(x)² dx`,
      ['Ghi hai cận theo trục quay.','Tìm bán kính từng thiết diện, bình phương trước khi lấy tích phân.','Tính thể tích và giữ hệ số π nếu đề yêu cầu.'],
      ['Quay miền dưới y = x trên [0; 2] quanh Ox. Tính thể tích.',['Bán kính tại x là x.','Tích phân x² trên [0; 2] bằng 8/3.'],'8π/3.'],
      short('Quay miền dưới y = 2x trên [0; 3] quanh Ox. Thể tích có dạng kπ. Tìm k.',36,'Tích phân bình phương bán kính 4x² trên [0; 3] bằng 4 × 27/3 = 36.'))
  ]);

  book('g12-b19',1,640,[
    ['Phân hoạch và toàn phần',[
      'Các nhóm A₁, A₂, … phải đôi một rời nhau và bao phủ mọi trường hợp. Xác suất đồng thời trên mỗi nhánh là xác suất nhóm nhân xác suất biến cố trong nhóm.',
      'Muốn tính xác suất B, cộng tất cả các nhánh dẫn đến B.'
    ],F`P(B)=∑ P(A_i)P(B∣A_i)`],
    ['Bayes và câu hỏi ngược',[
      'Nếu đã biết B xảy ra, mẫu số phải là xác suất B của tất cả các nhóm. Tử số là nhánh vừa thuộc nhóm đang hỏi vừa có B.',
      'Điều kiện sử dụng công thức là P(B) > 0.'
    ],F`P(A_j∣B)=\frac{P(A_j)P(B∣A_j)}{P(B)}`]
  ],[
    m('total','Tính xác suất toàn phần','Biến cố cần tính có thể xảy ra trong nhiều nhóm khác nhau.',
      'P(B) = P(A)P(B∣A) + P(Ā)P(B∣Ā)',
      ['Xác định hai hoặc nhiều nhóm rời nhau bao phủ mẫu.','Nhân xác suất của nhóm với xác suất xảy ra B trong nhóm đó.','Cộng đúng các nhánh có B, giữ nhất quán số thập phân và phần trăm.'],
      ['60% kiện hàng đi tuyến A, tỉ lệ trễ 5%. Tuyến B chiếm 40%, tỉ lệ trễ 10%. Tìm xác suất trễ.',['Nhánh A và trễ có xác suất 0,6 × 0,05 = 0,03.','Nhánh B và trễ có xác suất 0,4 × 0,1 = 0,04.'],'7%.'],
      short('Kho A cung cấp 75% gói hàng và 4% bị hỏng. Kho B cung cấp 25% và 12% bị hỏng. Bao nhiêu phần trăm gói hàng bị hỏng? Điền số phần trăm.',6,'P(hỏng) = 0,75 × 0,04 + 0,25 × 0,12 = 0,06, tức 6%.')),
    m('bayes','Tính xác suất ngược bằng công thức Bayes','Đã quan sát kết quả B và cần suy ra nhóm xuất phát.',
      F`P(A∣B)=\frac{P(A)P(B∣A)}{P(B)}`,
      ['Viết xác suất đích P(A∣B) để thấy B là điều kiện.','Tính P(B) bằng toàn phần.','Chia xác suất nhánh A và B cho P(B), rút gọn kết quả.'],
      ['Hai tuyến A và B chở số kiện bằng nhau. Tỉ lệ trễ lần lượt là 2% và 6%. Biết một kiện bị trễ, xác suất đến từ B là bao nhiêu?',['Nhánh B và trễ bằng 0,5 × 0,06 = 0,03.','Tổng trễ là 0,5 × 0,02 + 0,03 = 0,04.'],'3/4.'],
      short('Nhà máy A sản xuất 80% linh kiện, lỗi 1%. Nhà máy B sản xuất 20%, lỗi 4%. Một linh kiện bị lỗi. Tính xác suất nó đến từ B.',.5,'Hai nhánh lỗi có xác suất 0,8 × 0,01 = 0,008 và 0,2 × 0,04 = 0,008. Nhánh B chiếm một nửa.','1/2'))
  ],[
    tf('Một trung tâm có 40% học viên học ca A, còn lại học ca B. Tỉ lệ đến sớm trong hai ca lần lượt là 75% và 50%.',[
      ['Xác suất một học viên bất kỳ học ca B là 0,6.',true,'Hai ca bao phủ tất cả, nên 1 − 0,4 = 0,6.'],
      ['Xác suất một học viên vừa học ca A vừa đến sớm là 0,75.',false,'Phải nhân 0,4 × 0,75, được 0,3.'],
      ['Xác suất đến sớm là 0,6.',true,'Cộng 0,4 × 0,75 và 0,6 × 0,5.'],
      ['Biết học viên đến sớm, xác suất học ca A là 0,4.',false,'Xác suất ngược là 0,3/0,6 = 0,5.']
    ])
  ]);

  book('g6-b12',1,87,[
    ['Bội chung và bội chung nhỏ nhất',[
      'Bội chung của các số là số chia hết cho tất cả các số đó. BCNN của các số dương là bội chung dương nhỏ nhất. Số 0 là bội chung nhưng không được chọn làm BCNN.',
      'Phân tích mỗi số ra thừa số nguyên tố. Với mỗi thừa số xuất hiện, chọn số mũ lớn nhất rồi nhân lại. Mọi bội chung là bội của BCNN.'
    ],'BC(a; b) = B(BCNN(a; b))']
  ],[
    m('lcm','Tìm BCNN bằng phân tích thừa số nguyên tố','Đề hỏi bội chung dương nhỏ nhất hoặc số nhỏ nhất chia hết cho các số đã cho.',
      'Nếu a chia hết cho b thì BCNN(a; b) = a.',
      ['Phân tích các số.','Lấy mọi thừa số nguyên tố xuất hiện với số mũ cao nhất.','Nhân các lũy thừa đã chọn và thử tính chia hết.'],
      ['Tính BCNN(18; 24).',['18 = 2 × 3², 24 = 2³ × 3.','Chọn 2³ và 3².'],'BCNN = 72.'],
      short('Tìm BCNN(20; 36).',180,'20 = 2² × 5, 36 = 2² × 3². Lấy 2² × 3² × 5 = 180.')),
    m('schedule','Tìm lần trùng nhau của các chu kì','Hai hoạt động lặp theo thời gian và bắt đầu cùng một mốc.',
      'Mốc trùng tiếp theo = mốc chung ban đầu + BCNN của các chu kì.',
      ['Đổi về cùng đơn vị thời gian.','Viết thời gian đã qua phải là bội dương của mọi chu kì.','Lấy BCNN rồi cộng vào giờ bắt đầu nếu đề hỏi giờ.'],
      ['Hai đèn vừa chớp cùng lúc. Một đèn chớp mỗi 10 giây, đèn kia mỗi 14 giây. Sau bao lâu lại cùng chớp?',['Thời gian phải là bội của 10 và 14.'],'70 giây.'],
      short('Hai chuyến xe vừa cùng rời bến. Tuyến A cách 16 phút có chuyến, tuyến B cách 24 phút. Sau ít nhất bao nhiêu phút hai chuyến lại rời bến cùng lúc?',48,'BCNN(16; 24) = 48.')),
    m('bounded','Tìm bội chung trong một khoảng','Đề thêm điều kiện lớn hơn, nhỏ hơn hoặc nằm giữa hai số.',
      'Số cần tìm có dạng k × BCNN.',
      ['Tính BCNN.','Liệt kê các bội liên tiếp gần khoảng đề cho.','Chỉ giữ những bội thỏa cả hai đầu mút.'],
      ['Tìm bội chung của 8 và 12 lớn hơn 40 và nhỏ hơn 80.',['BCNN = 24.','Các bội gần khoảng là 24, 48, 72, 96.'],'48 và 72.'],
      short('Có bao nhiêu bội chung của 6 và 10 lớn hơn 50 và không vượt quá 120?',3,'BCNN = 30. Nhận 60, 90 và 120.'))
  ]);

  book('g7-b21',2,7,[
    ['Tỉ số chung',[
      'Từ x/a = y/b = k, suy ra x = ak và y = bk. Dùng dữ kiện cộng, trừ hoặc điều kiện khác để tìm k.',
      'Tính chất dãy tỉ số dùng được với tổng và hiệu các tử nếu mẫu tương ứng khác 0. Giữ đúng thứ tự của hiệu.'
    ],F`\frac{x}{a}=\frac{y}{b}=\frac{x+y}{a+b}=\frac{x−y}{a−b}`]
  ],[
    m('find-ratio','Tìm số từ dãy tỉ số và một tổng hoặc hiệu','Đề có các tỉ số bằng nhau và cho giá trị của tổng hay hiệu.',
      'x = ak, y = bk',
      ['Gọi k là tỉ số chung.','Thế x = ak, y = bk vào dữ kiện để tìm k.','Tính từng số rồi thay lại kiểm tra.'],
      ['Cho x/4 = y/7 và y − x = 12.',['Đặt x = 4k, y = 7k, nên 3k = 12.'],'x = 16, y = 28.'],
      short('Cho x/5 = y/8 và x + y = 39. Tìm y.',24,'13k = 39 nên k = 3. Do đó y = 8 × 3 = 24.')),
    m('expression','Tính giá trị biểu thức từ dãy tỉ số','Cần tính biểu thức theo x, y khi chỉ biết quan hệ tỉ lệ.',
      'Đặt tỉ số chung k rồi thay đồng thời các biến.',
      ['Biểu diễn các biến theo k.','Thay vào tử và mẫu của biểu thức.','Rút gọn k nếu k khác 0.'],
      ['Với x/3 = y/5 và x khác 0, tính (x + y)/x.',['Đặt x = 3k, y = 5k, k khác 0.'],'8/3.'],
      short('Biết x/2 = y/7 và y khác 0. Tính (y − x)/y.',5/7,'Thay x = 2k, y = 7k, rút gọn 5k/(7k) thành 5/7.','5/7')),
    m('context','Chia một lượng theo tỉ lệ','Dùng khi đề chia tiền, độ dài hoặc số vật theo một tỉ lệ cho trước.',
      'Lượng của nhóm = số phần của nhóm × giá trị một phần.',
      ['Xác định tổng số phần của tỉ lệ.','Lấy tổng lượng chia tổng số phần để tìm giá trị một phần.','Nhân với số phần của từng nhóm, kiểm tra tổng và đơn vị.'],
      ['Chia 72 quyển vở cho hai nhóm theo tỉ lệ 5:4.',['Tổng 9 phần, mỗi phần 8 quyển.'],'40 quyển và 32 quyển.'],
      short('Hai đội trồng tổng cộng 96 cây theo tỉ lệ 5:7. Đội có nhiều cây hơn trồng bao nhiêu cây?',56,'Mỗi phần bằng 96/12 = 8 cây. Đội nhiều hơn có 7 phần, tức 56 cây.'))
  ]);

  book('g9-b20',2,36,[
    ['Viète và điều kiện có hai nghiệm',[
      'Nếu ax² + bx + c = 0 với a khác 0 có hai nghiệm thực x₁, x₂ (có thể trùng nhau), tổng và tích của chúng được tính trực tiếp từ hệ số.',
      'Muốn dùng Viète cho phương trình có tham số, kiểm tra điều kiện a khác 0 và biệt thức không âm trước.'
    ],F`x₁+x₂=−\frac{b}{a}
x₁x₂=\frac{c}{a}
x₁²+x₂²=(x₁+x₂)²−2x₁x₂`],
    ['Viète đảo',[
      'Nếu hai số có tổng S và tích P thì chúng là nghiệm của t² − St + P = 0. Hai số thực tồn tại khi S² − 4P ≥ 0.'
    ],'t² − St + P = 0']
  ],[
    m('mental','Nhẩm nghiệm bằng tổng và tích','Thường dùng với hệ số đơn giản, hoặc nhận ra một nghiệm 1 hay −1.',
      'Nếu a + b + c = 0 thì x = 1 là nghiệm.',
      ['Kiểm tra tổng hệ số hoặc thử một cặp có tích c/a.','Đối chiếu tổng cần có là −b/a.','Thử lại vào phương trình để xác nhận.'],
      ['Nhẩm hai nghiệm của x² − 8x + 15 = 0.',['Hai số cần tổng 8, tích 15.'],'3 và 5.'],
      mcq('Cặp nào là hai nghiệm của x² + 2x − 15 = 0?',['−3 và 5','−5 và 3','−5 và −3','3 và 5'],1,'−5 + 3 = −2 và (−5) × 3 = −15.')),
    m('symmetric','Tính biểu thức đối xứng của hai nghiệm','Không cần giải phương trình nếu biểu thức có thể viết theo tổng S và tích P.',
      'x₁² + x₂² = S² − 2P',
      ['Tính S và P từ hệ số.','Viết lại biểu thức theo S, P.','Nếu có nghịch đảo, kiểm tra P khác 0 trước khi chia.'],
      ['Cho x₁, x₂ là nghiệm của x² − 6x + 5 = 0. Tính 1/x₁ + 1/x₂.',['S = 6, P = 5 khác 0.','Quy đồng được S/P.'],'6/5.'],
      short('Hai nghiệm của x² + 3x − 4 = 0 có tổng bình phương bằng bao nhiêu?',17,'S = −3, P = −4. Tính S² − 2P = 9 + 8.')),
    m('inverse','Tìm hai số biết tổng và tích','Đề cho S và P, hỏi hai số hoặc một số nhỏ hơn/lớn hơn.',
      't² − St + P = 0',
      ['Lập phương trình bậc hai từ tổng và tích.','Tính biệt thức hoặc phân tích thành nhân tử.','Chọn nghiệm theo yêu cầu rồi kiểm tra tổng, tích.'],
      ['Hai số có tổng 7 và tích 10. Tìm số lớn hơn.',['Hai số là nghiệm của t² − 7t + 10 = 0.','Phân tích (t − 2)(t − 5).'],'5.'],
      short('Hai số thực có tổng 1 và tích −12. Tìm số nhỏ hơn.',-3,'Giải t² − t − 12 = 0, được t = 4 hoặc t = −3.'))
  ]);

  book('g11-b12',1,98,[
    ['Vị trí của một đường và một mặt phẳng',[
      'Đường thẳng có thể nằm trong mặt, cắt mặt ở một điểm, hoặc song song với mặt. Muốn kết luận song song, cần biết đường thẳng không nằm trong mặt.',
      'Nếu d nằm ngoài (P) và song song với a nằm trong (P) thì d song song (P).'
    ],'d ∥ a, a ⊂ (P), d ⊄ (P) ⇒ d ∥ (P)'],
    ['Tìm giao tuyến bằng phương song song',[
      'Khi mặt phẳng (Q) chứa d song song với (P) và cắt (P) theo a, giao tuyến a song song d.',
      'Một điểm chung và một phương xác định giao tuyến nếu đã biết hai mặt thực sự cắt nhau.'
    ],'d ⊂ (Q), d ∥ (P), (P) ∩ (Q) = a ⇒ a ∥ d']
  ],[
    m('prove','Chứng minh đường thẳng song song với mặt phẳng','Tìm một đường nằm trong mặt phẳng và cùng phương với đường cần chứng minh.',
      'd ∥ a, a ⊂ (P), d ⊄ (P)',
      ['Tìm trong mặt phẳng một đường có thể song song với d.','Chứng minh hai đường song song bằng đường trung bình, cạnh đối hình bình hành hoặc tính chất tương ứng.','Chứng minh d không nằm trong mặt, rồi áp dụng dấu hiệu.'],
      ['Trong hình chóp S.ABC, M và N là trung điểm SA và SB. Chứng minh MN ∥ (ABC).',['MN là đường trung bình của tam giác SAB nên MN ∥ AB.','AB nằm trong (ABC), còn M không nằm trong (ABC).'],'MN ∥ (ABC).'],
      mcq('Trong hình chóp S.ABC, E, F là trung điểm SA, SC. Dùng đường nào để chứng minh EF ∥ (ABC)?',['AB','AC','BC','SA'],1,'EF là đường trung bình của tam giác SAC, nên EF ∥ AC. EF không nằm trong (ABC).')),
    m('intersection-parallel','Tìm giao tuyến nhờ đường song song với mặt','Biết một điểm chung, một đường nằm trong mặt thứ hai và song song với mặt thứ nhất.',
      'Giao tuyến đi qua điểm chung và song song với d.',
      ['Tìm một điểm chung của hai mặt phẳng.','Trong một mặt, tìm d song song với mặt còn lại.','Kẻ qua điểm chung đường thẳng song song với d, ghi rõ hai mặt cắt nhau.'],
      ['Cho d ⊂ (Q), d ∥ (P), A thuộc cả hai mặt phân biệt. Tìm giao tuyến.',['Hai mặt phân biệt có điểm chung A.','Giao tuyến có phương của d.'],'Đường qua A song song d.'],
      tf('Cho d ⊂ (Q), d ∥ (P) và (P), (Q) cắt nhau theo a.',[
        ['a nằm trong (P).',true,'Giao tuyến gồm các điểm chung của hai mặt.'],
        ['d cắt a tại một điểm.',false,'Điểm cắt sẽ là điểm chung của d và (P), trái với d ∥ (P).'],
        ['a song song với d.',true,'Hai đường cùng nằm trong (Q) và không cắt nhau.'],
        ['d là giao tuyến của (P) và (Q).',false,'d không có điểm chung với (P).']
      ]))
  ]);

  lessons['g11-b1'].methods.splice(1,0,
    m('arc','Độ dài cung tròn','Đề cho bán kính, góc quét hoặc độ dài cung.',
      'l = R|α| khi α tính bằng rađian.',
      ['Đổi số đo góc quét sang rađian.','Nhân bán kính với độ lớn số đo góc.','Nếu đề hỏi góc hoặc bán kính, giải ngược và ghi đơn vị.'],
      ['Kim dài 16 cm quay góc 135°. Đầu kim đi bao xa?',['135° = 3π/4.','Tính 16 × 3π/4.'],'12π cm.'],
      short('Bán kính bánh xe là 24 cm. Một điểm trên vành quay góc 75°. Độ dài cung có dạng kπ cm. Tìm k.',10,'75° = 5π/12, nhân 24 được 10π cm.')),
    m('terminal','Biểu diễn góc lượng giác trên đường tròn','Cần xác định tia cuối hoặc góc phần tư của điểm biểu diễn.',
      'α và α + k·2π có cùng điểm cuối.',
      ['Quy ước xuất phát từ tia Ox dương.','Cộng hoặc trừ số nguyên vòng để lấy góc đại diện trong một vòng.','Xác định góc phần tư hoặc nửa trục mà góc đại diện rơi vào.'],
      ['Xác định điểm cuối của −450°.',['Cộng 720° được 270°.','Điểm nằm trên nửa trục Oy âm.'],'M(0; −1).'],
      mcq('Tia quay góc 13π/6 có điểm cuối ở đâu?',['Phần tư I','Phần tư II','Phần tư III','Phần tư IV'],0,'Trừ 2π còn π/6, thuộc phần tư I.'))
  );
  lessons['g11-b1'].methods.splice(4,0,
    m('special','Tính giá trị lượng giác ở góc đặc biệt','Góc sau khi quy về một vòng liên quan đến 0°, 30°, 45°, 60° hoặc 90°.',
      'cos(π − α) = −cos α',
      ['Quy góc đã cho về một vòng nếu cần.','Tìm góc nhọn tương ứng với độ lớn của giá trị.','Chọn dấu theo góc phần tư và kiểm tra hàm có xác định.'],
      ['Tính tan 135°.',['135° bù với 45°.','Tan đổi dấu đối với hai góc bù.'],'−1.'],
      mcq('Giá trị của cos 240° là bao nhiêu?',['−1/2','1/2','−√3/2','√3/2'],0,'240° = 180° + 60°, cos bằng −cos 60° = −1/2.'))
  );
  lessons['g11-b1'].methods.push(
    m('bounds','Tìm giới hạn trên và dưới của biểu thức lượng giác','Đề yêu cầu giá trị lớn nhất, nhỏ nhất dựa vào hệ thức và miền của sin, cos.',
      '0 ≤ sin² x ≤ 1; 0 ≤ cos² x ≤ 1',
      ['Chọn một bình phương làm ẩn phụ, thay bình phương còn lại bằng 1 trừ nó.','Tìm giá trị nhỏ nhất, lớn nhất của biểu thức theo ẩn trong [0; 1].','Kiểm tra có góc đạt được các giá trị biên.'],
      ['Tìm giá trị lớn nhất của 4 sin² x + 2 cos² x.',['Đổi thành 2 + 2 sin² x.','Giá trị lớn nhất đạt khi sin² x = 1.'],'4.'],
      short('Giá trị nhỏ nhất của 7 cos² x − 2 sin² x bằng bao nhiêu?',-2,'Đổi thành 9 cos² x − 2. Cos² x nhỏ nhất bằng 0.'))
  );
  const [domain,range,symmetry,period]=lessons['g11-b3'].methods;
  lessons['g11-b3'].methods=[domain,symmetry,period,range];
  lessons['g11-b4'].methods.splice(3,0,
    m('interval','Chọn nghiệm thuộc khoảng hoặc đoạn','Có họ nghiệm chứa k nguyên và một miền giới hạn cho x.',
      'a ≤ x < b ⇒ a ≤ x₀ + kT < b',
      ['Giải phương trình để có đủ họ nghiệm tổng quát.','Đưa từng họ vào bất đẳng thức của khoảng đề bài.','Lấy các giá trị nguyên của k, loại nghiệm trùng và kiểm tra đầu mút.'],
      ['Đếm nghiệm sin x = 0 trên [0; 2π].',['Nghiệm x = kπ.','Điều kiện 0 ≤ k ≤ 2 cho k = 0, 1, 2.'],'Ba nghiệm.'],
      short('Phương trình cos x = −1 có bao nhiêu nghiệm trong (−π; 3π]?',2,'Họ nghiệm x = π + 2kπ. Loại −π, nhận π và 3π.')),
    m('time','Tìm thời điểm từ mô hình lượng giác','Một đại lượng tuần hoàn đạt ngưỡng ở những thời điểm được giới hạn.',
      'h(t) = D + A sin(ωt + φ)',
      ['Thay độ cao hoặc ngưỡng vào mô hình, cô lập hàm lượng giác.','Giải theo pha ωt + φ, rồi đổi sang thời gian t.','Lọc trong khoảng thời gian đề bài và lấy lần đầu nếu được hỏi.'],
      ['Ghế vòng quay cao h(t) = 10 + 4 sin(πt/6) mét, t tính bằng giây. Tìm lần đầu đạt 14 m sau t = 0.',['Cần sin(πt/6) = 1.','Pha dương nhỏ nhất là π/2 nên t = 3.'],'3 giây.'],
      short('Mô hình mực nước h(t) = 3 + 2 cos(πt/4) mét, t tính theo giờ. Sau t = 0, lần đầu mực nước đạt 3 m sau bao nhiêu giờ?',2,'Cần cos(πt/4) = 0. Pha dương nhỏ nhất là π/2, suy ra t = 2 giờ.'))
  );
  lessons['g9-b2'].methods.splice(2,0,
    m('calculator','Kiểm tra nghiệm với công cụ giải hệ','Dùng chức năng giải hệ bậc nhất hai ẩn để kiểm tra phép tính.',
      'Mỗi hàng hệ số có thứ tự a, b, c trong ax + by = c.',
      ['Đưa từng phương trình về dạng ax + by = c.','Nhập đủ hai hàng hệ số, kể cả hệ số 0.','Đọc kết quả theo thứ tự x rồi y và thế lại vào hệ.'],
      ['Với x − 2y = 1, 3x + y = 10, ghi hai hàng hệ số.',['Hàng đầu là (1; −2; 1), hàng sau là (3; 1; 10).','Kiểm tra cặp (3; 1) bằng thế trực tiếp.'],'x = 3, y = 1.'],
      mcq('Đưa 2y = x + 8 về ax + by = c với a = 1. Hàng hệ số là gì?',['(1; 2; 8)','(1; −2; 8)','(1; −2; −8)','(1; 2; −8)'],2,'Chuyển 2y sang vế trái và 8 sang vế phải, được x − 2y = −8.'))
  );
  lessons['g10-b2'].methods.push(
    m('set-parameter','Tìm tham số để thỏa quan hệ giữa các tập','Đầu mút phụ thuộc tham số, đề hỏi giao khác rỗng hoặc tập con.',
      'Với hai đoạn không rỗng, [a; b] ⊂ [c; d] ⇔ c ≤ a và b ≤ d.',
      ['Ghi điều kiện các đầu mút của đoạn theo đúng thứ tự.','Diễn dịch quan hệ tập hợp thành bất đẳng thức của đầu mút.','Giải đồng thời và thử lại các giá trị biên.'],
      ['Với A = [m; m + 1], B = [0; 5], tìm m để A ⊂ B.',['Cần m ≥ 0 và m + 1 ≤ 5.'],'0 ≤ m ≤ 4.'],
      short('Cho A = [m; m + 3], B = [−2; 6]. Tìm m lớn nhất để A là tập con của B.',3,'Cần m ≥ −2 và m + 3 ≤ 6. Giá trị lớn nhất là 3.')),
    m('venn','Dùng biểu đồ Venn để đếm','Hai nhóm có thể có người hoặc vật thuộc cả hai.',
      'n(A ∪ B) = n(A) + n(B) − n(A ∩ B)',
      ['Ghi số lượng ở phần giao trước.','Tính phần chỉ thuộc A và phần chỉ thuộc B.','Cộng ba vùng rời nhau hoặc lấy tổng trừ hợp khi hỏi phần ở ngoài.'],
      ['Lớp có 18 bạn học vẽ, 12 bạn học đàn, 5 bạn học cả hai. Có bao nhiêu bạn học ít nhất một môn?',['Cộng 18 và 12 rồi trừ phần giao 5.'],'25 bạn.'],
      short('Trong 35 bạn, 17 thích bóng rổ, 14 thích bơi, 6 thích cả hai. Có bao nhiêu bạn không thích môn nào trong hai môn?',10,'Hợp có 17 + 14 − 6 = 25 bạn. Bên ngoài có 35 − 25 = 10.'))
  );
  lessons['g12-b1'].methods.splice(1,0,
    m('monotonic-chart','Đọc tính đơn điệu từ đồ thị hoặc bảng biến thiên','Đề cho trực tiếp hướng đi của đồ thị, mũi tên hoặc dấu của f′.',
      'Đọc theo chiều x tăng từ trái sang phải.',
      ['Xác định hình cho f hay cho f′.','Với f, đọc đường cong đi lên hay xuống. Với f′, đọc dấu trên từng khoảng.','Tách các khoảng tại điểm loại khỏi tập xác định.'],
      ['Bảng cho f′ dương ở (−∞; 2) và âm ở (2; +∞). Đọc khoảng đồng biến.',['Trên phần bên trái 2, đạo hàm mang dấu dương.'],'(−∞; 2).'],
      mcq('Đồ thị f′ nằm hoàn toàn dưới Ox trên (0; 2), hoàn toàn trên Ox trên (2; 5). Nhận xét nào đúng?',['f tăng trên (0; 2)','f giảm trên (2; 5)','f giảm trên (0; 2)','f không đổi trên (0; 2)'],2,'Đồ thị f′ nằm dưới trục hoành nghĩa là f′ âm.'))
  );
  lessons['g12-b1'].methods.splice(3,0,
    m('extrema-chart','Đọc cực trị từ bảng biến thiên hoặc đồ thị','Cực trị là nơi hướng biến thiên đổi khi đi qua một điểm thuộc tập xác định.',
      'Giảm → tăng: cực tiểu. Tăng → giảm: cực đại.',
      ['Đọc chiều đi của bảng hoặc đồ thị hai phía.','Kiểm tra điểm đổi chiều có nằm trong miền xác định.','Đọc đúng hoành độ hoặc giá trị cực trị theo câu hỏi.'],
      ['Hàm giảm đến điểm (2; −4), rồi tăng. Giá trị cực tiểu là gì?',['Hướng biến thiên đổi từ giảm sang tăng tại x = 2.','Giá trị là tung độ.'],'−4.'],
      short('Bảng cho f tăng đến x = −1 với f(−1) = 6, sau đó giảm. Giá trị cực đại là bao nhiêu?',6,'x = −1 là điểm đổi tăng sang giảm. Giá trị cực đại bằng f(−1) = 6.')),
    m('motion','Dùng tính đơn điệu để mô tả bài toán thực tế','Đề hỏi lúc đại lượng tăng hay giảm hoặc lúc chuyển hướng.',
      'Nếu s(t) là tọa độ thì v(t) = s′(t).',
      ['Viết đạo hàm và giới hạn t trong thời gian đề cho.','Tìm các mốc đạo hàm đổi dấu.','Diễn giải dấu theo ngữ cảnh, kèm đơn vị.'],
      ['Một vật có s(t) = t² − 6t. Khi nào tọa độ giảm trong 0 ≤ t ≤ 5?',['v(t) = 2t − 6 < 0 khi t < 3.'],'Trong khoảng (0; 3).'],
      short('Một vật có tọa độ s(t) = t² − 10t + 16, t tính theo giây. Tại giây thứ mấy vật đổi chiều?',5,'s′(t) = 2t − 10 đổi từ âm sang dương tại t = 5.'))
  );
  book('g6-b11',1,81,[
    ['Ước chung và ƯCLN',[
      'Một số là ước chung nếu mọi số đã cho đều chia hết cho nó. ƯCLN là ước chung lớn nhất của các số tự nhiên dương.',
      'Khi phân tích thừa số nguyên tố, giữ các thừa số có mặt trong mọi số và lấy số mũ nhỏ nhất. Nếu không có thừa số chung, ƯCLN bằng 1.',
      'Muốn tìm tất cả ước chung, tìm các ước của ƯCLN.'
    ],'ƯC(a; b) = Ư(ƯCLN(a; b))']
  ],[
    m('gcd','Tìm ước chung lớn nhất','Đề hỏi ước lớn nhất của tất cả các số đã cho.',
      'Nếu a là bội của b thì ƯCLN(a; b) = b.',
      ['Phân tích từng số ra thừa số nguyên tố.','Giữ thừa số chung với số mũ nhỏ nhất.','Nhân lại và thử kết quả có chia hết từng số hay không.'],
      ['Tìm ƯCLN(54; 72).',['54 = 2 × 3³, 72 = 2³ × 3².','Lấy 2 và 3².'],'18.'],
      short('Tìm ƯCLN(84; 126).',42,'84 = 2² × 3 × 7, 126 = 2 × 3² × 7. Giữ 2 × 3 × 7 = 42.')),
    m('common-divisors','Tìm các ước chung từ ƯCLN','Đề hỏi tất cả ước chung hoặc đếm các ước chung thỏa điều kiện.',
      'ƯC(a; b) = Ư(ƯCLN(a; b))',
      ['Tính ƯCLN của các số đã cho.','Liệt kê các ước của ƯCLN theo cặp tích.','Áp dụng thêm điều kiện lớn hơn hoặc nhỏ hơn nếu đề yêu cầu.'],
      ['Liệt kê ước chung của 24 và 36.',['ƯCLN(24; 36) = 12.','Các ước dương của 12 là 1, 2, 3, 4, 6, 12.'],'Có 6 ước chung.'],
      short('Có bao nhiêu ước chung của 42 và 70 lớn hơn 2?',2,'ƯCLN = 14. Các ước là 1, 2, 7, 14. Chỉ nhận 7 và 14.')),
    m('grouping','Chia đều thành số nhóm giống nhau nhiều nhất','Cần chia hết mỗi loại vào các nhóm mà không thừa.',
      'Số nhóm lớn nhất bằng ƯCLN của các số lượng.',
      ['Gọi số nhóm là n. Mỗi số lượng đều phải chia hết cho n.','Lấy ƯCLN để tìm số nhóm lớn nhất.','Chia từng số lượng cho số nhóm nếu đề hỏi số vật một nhóm.'],
      ['Chia hết 30 bút xanh và 42 bút đỏ vào số hộp giống nhau lớn nhất.',['ƯCLN(30; 42) = 6.','Mỗi hộp có 5 bút xanh và 7 bút đỏ.'],'6 hộp.'],
      short('Chia hết 72 quyển vở và 48 thước thành số phần quà giống nhau nhiều nhất. Mỗi phần có bao nhiêu quyển vở?',3,'Số phần là ƯCLN(72; 48) = 24. Mỗi phần có 72/24 = 3 quyển.'))
  ]);

  book('g9-b1',1,9,[
    ['Phương trình bậc nhất hai ẩn',[
      'Phương trình ax + by = c là bậc nhất hai ẩn khi a và b không đồng thời bằng 0. Nghiệm là cặp (x; y) làm đẳng thức đúng.',
      'Tập nghiệm biểu diễn một đường thẳng. Nếu b khác 0, biểu diễn y theo x. Nếu b bằng 0, đường thẳng đứng x = c/a.'
    ],F`y=\frac{c−ax}{b}\text{ khi }b≠0`],
    ['Hệ hai phương trình',[
      'Cặp nghiệm của hệ thỏa cả hai phương trình. Hai đường cắt nhau, song song phân biệt hoặc trùng nhau tương ứng có một nghiệm, vô nghiệm hoặc vô số nghiệm.'
    ],'']
  ],[
    m('recognize-equation','Nhận biết phương trình và kiểm tra một cặp nghiệm','Xét bậc của từng ẩn và thế cặp số vào đẳng thức.',
      'ax + by = c, với a và b không đồng thời bằng 0.',
      ['Thu gọn về một vế nếu cần.','Kiểm tra chỉ còn hằng số và các hạng tử bậc nhất theo x hoặc y.','Thế lần lượt tọa độ thứ nhất cho x và tọa độ thứ hai cho y.'],
      ['(2; −1) có là nghiệm của 3x + y = 5 không?',['Thế được 3 × 2 − 1 = 5.'],'Có.'],
      mcq('Phương trình nào là bậc nhất hai ẩn?',['xy = 3','x² − y = 1','0x + 4y = 8','0x + 0y = 5'],2,'Hệ số của x được bằng 0 khi hệ số của y khác 0.')),
    m('coefficient','Điều kiện của hệ số chứa tham số','Xét giá trị làm cả hai hệ số của x và y cùng bằng 0.',
      'Điều kiện: a ≠ 0 hoặc b ≠ 0.',
      ['Đọc a và b theo tham số.','Tìm giá trị làm a = 0 và b = 0 đồng thời.','Loại các giá trị tìm được.'],
      ['Xét (m − 1)x + (m − 1)y = 2. Khi nào là bậc nhất hai ẩn?',['Cả hai hệ số cùng bằng 0 khi m = 1.'],'m khác 1.'],
      short('Tìm giá trị m làm phương trình (m − 4)x + 0y = 6 không còn là bậc nhất hai ẩn.',4,'Hệ số của y đã bằng 0. Hệ số của x cũng bằng 0 khi m = 4.')),
    m('general','Nghiệm tổng quát và đường thẳng biểu diễn','Đề hỏi mô tả mọi nghiệm hoặc vẽ đường thẳng nghiệm.',
      'Nếu b = 0 và a ≠ 0 thì x = c/a, y tùy ý.',
      ['Chọn một ẩn làm tham số và biểu diễn ẩn kia.','Lấy hai cặp nghiệm phân biệt thuận tiện để vẽ.','Kiểm tra cả hai cặp thỏa phương trình.'],
      ['Mô tả nghiệm của 2x − y = 3.',['Rút y = 2x − 3.','Chọn x tùy ý.'],'Mọi cặp (t; 2t − 3) với t thực.'],
      short('Đường thẳng biểu diễn 4x + 2y = 12 cắt trục tung tại điểm có tung độ bao nhiêu?',6,'Trục tung có x = 0. Khi đó 2y = 12, nên y = 6.')),
    m('system-solution','Kiểm tra nghiệm của hệ','Cặp số phải thỏa hai phương trình cùng lúc.',
      'Nghiệm của hệ = nghiệm chung của hai phương trình.',
      ['Thế x và y vào phương trình đầu.','Nếu đúng, thế vào phương trình thứ hai.','Chỉ kết luận là nghiệm của hệ khi cả hai đẳng thức đúng.'],
      ['(1; 2) có thỏa hệ x + y = 3 và 2x − y = 1 không?',['Phương trình đầu đúng.','Phương trình sau cho 0, khác 1.'],'Không.'],
      mcq('Cặp nào thỏa cả x + y = 5 và x − y = 1?',['(1; 4)','(2; 3)','(3; 2)','(4; 1)'],2,'Với (3; 2), tổng bằng 5 và hiệu bằng 1.')),
    m('count','Đoán nhận số nghiệm của hệ bằng hai đường thẳng','So sánh hai hàng hệ số hoặc quan sát đồ thị.',
      'Cắt nhau: một nghiệm. Trùng nhau: vô số nghiệm. Song song phân biệt: vô nghiệm.',
      ['Đưa hai phương trình về dạng tương đương dễ so sánh.','Nếu hai vế trái tỉ lệ, kiểm tra hai hằng số bên phải có cùng tỉ lệ.','Kết luận số nghiệm theo vị trí của hai đường.'],
      ['Xét x + 3y = 7 và 2x + 6y = 14.',['Phương trình sau bằng hai lần phương trình trước.'],'Hai đường trùng, vô số nghiệm.'],
      mcq('Hệ 2x − y = 4 và 6x − 3y = 10 có bao nhiêu nghiệm?',['Không có','Một','Hai','Vô số'],0,'Vế trái gấp 3, nhưng 10 khác 3 × 4.'))
  ],[
    tf('Cho phương trình 4x + 2y = 8.',[
      ['Phương trình bậc nhất hai ẩn.',true,'Hai hệ số 4 và 2 không đồng thời bằng 0.'],
      ['Cặp (1; 2) không phải là nghiệm.',false,'4 × 1 + 2 × 2 = 8.'],
      ['Đường biểu diễn cắt trục Ox tại (2; 0).',true,'Cho y = 0, giải 4x = 8.'],
      ['Mọi cặp nghiệm đều có y = 2x + 4.',false,'Rút đúng là y = 4 − 2x.']
    ])
  ]);

  book('g9-b3',1,25,[
    ['Lập hệ từ hai đại lượng',[
      'Chọn hai ẩn, ghi đơn vị và điều kiện. Mỗi quan hệ trong đề cho một phương trình. Sau khi giải, kiểm tra nghiệm có ý nghĩa trong bài toán.',
      'Đổi đơn vị trước khi lập hệ. Trong bài làm chung, cộng năng suất. Trong chuyển động, dùng quãng đường bằng vận tốc nhân thời gian.'
    ],'Số có hai chữ số = 10x + y với x là hàng chục, y là hàng đơn vị.']
  ],[
    m('numbers','Lập hệ từ quan hệ giữa hai số','Đề cho tổng, hiệu hoặc quan hệ gấp kém của hai số.',
      'Tổng = x + y; hiệu = x − y theo đúng thứ tự.',
      ['Chọn x là số thứ nhất và y là số thứ hai.','Dịch từng dữ kiện thành một phương trình.','Giải hệ rồi kiểm tra quan hệ lớn bé.'],
      ['Hai số có tổng 31 và số lớn hơn số bé 7.',['Gọi x là số lớn, y là số bé.','Giải x + y = 31 và x − y = 7.'],'19 và 12.'],
      short('Hai số có tổng 48, số thứ nhất gấp ba số thứ hai. Tìm số thứ nhất.',36,'x = 3y và x + y = 48. Suy ra y = 12, x = 36.')),
    m('digits','Lập hệ từ các chữ số','Đề nói về tổng chữ số hoặc đảo chữ số.',
      'Số ban đầu 10x + y; số đảo 10y + x.',
      ['Đặt x,y là chữ số, với x từ 1 đến 9.','Viết số ban đầu và số đảo.','Lập hai phương trình, giải và kiểm tra chữ số nguyên.'],
      ['Số có tổng chữ số bằng 9. Đảo chữ số thì tăng 27.',['Có x + y = 9 và 9(y − x) = 27.','Giải được x = 3, y = 6.'],'36.'],
      short('Số có hai chữ số có tổng các chữ số bằng 11. Đảo chữ số thì giảm 27. Tìm số ban đầu.',74,'x + y = 11 và 9(x − y) = 27. Suy ra x = 7, y = 4.')),
    m('work','Lập hệ theo năng suất làm chung','Thời gian làm riêng chưa biết, các dữ kiện nói về phần công việc đã làm.',
      'Khối lượng công việc = năng suất × thời gian.',
      ['Quy ước toàn bộ công việc bằng 1.','Chọn năng suất mỗi người làm ẩn để phương trình là bậc nhất.','Sau khi tìm năng suất, lấy nghịch đảo nếu đề hỏi thời gian làm riêng.'],
      ['Hai máy làm chung 6 giờ xong. Máy A làm 3 giờ, máy B làm 6 giờ, xong 3/4 công việc. Tìm năng suất máy A.',['Gọi x, y là phần công việc mỗi máy làm trong 1 giờ.','Có x + y = 1/6 và 3x + 6y = 3/4. Giải được x = 1/12.'],'1/12 công việc mỗi giờ.'],
      short('Hai máy làm chung 4 giờ xong. Máy A làm riêng 6 giờ xong. Máy B làm riêng mất bao nhiêu giờ?',12,'Năng suất máy B là 1/4 − 1/6 = 1/12 công việc mỗi giờ.')),
    m('motion','Lập hệ theo quãng đường và vận tốc','Hai vật chuyển động cùng hoặc ngược chiều, hoặc có đổi tốc độ.',
      's = v × t',
      ['Gọi vận tốc các vật, ghi cùng đơn vị.','Đổi thời gian về đơn vị phù hợp.','Biểu diễn quãng đường theo từng đoạn, lập hệ rồi kiểm tra nghiệm dương.'],
      ['Hai xe ngược chiều gặp sau 2 giờ, quãng đường 160 km, chênh vận tốc 10 km/h.',['Tổng vận tốc 80 km/h, hiệu 10 km/h.'],'45 km/h và 35 km/h.'],
      short('Hai xe ngược chiều gặp nhau sau 3 giờ trên đoạn 270 km. Xe nhanh hơn xe kia 18 km/h. Tìm vận tốc xe chậm theo km/h.',36,'Tổng vận tốc là 270/3 = 90. Xe chậm chạy (90 − 18)/2 = 36 km/h.')),
    m('mixture','Lập hệ từ khối lượng và nồng độ','Trộn hai dung dịch có tỉ lệ khác nhau, bỏ qua hao hụt.',
      'Khối lượng chất tan = khối lượng dung dịch × tỉ lệ chất tan.',
      ['Gọi khối lượng hai dung dịch làm ẩn.','Lập phương trình tổng khối lượng và phương trình tổng lượng chất tan.','Giải hệ, kiểm tra cả hai khối lượng dương và nồng độ cuối hợp lí.'],
      ['Pha 200 g dung dịch 15% từ hai loại 10% và 20%.',['Tổng hai lượng là 200 g.','Nồng độ 15% nằm giữa đúng hai nồng độ, nên hai lượng bằng nhau.'],'100 g mỗi loại.'],
      short('Để có 300 g dung dịch 18%, trộn dung dịch 10% và 30%. Cần bao nhiêu gam dung dịch 30%?',120,'Gọi y là lượng 30%. Chất tan là 0,1(300 − y) + 0,3y = 54. Suy ra y = 120 g.'))
  ],[
    mcq('Mua 2 vở và 3 bút tốn 26 nghìn đồng. Gọi x là giá một vở và y là giá một bút theo nghìn đồng. Viết phương trình đúng.',['3x + 2y = 26','2x + 3y = 26','x + y = 26','5xy = 26'],1,'Hai quyển vở tốn 2x, ba cây bút tốn 3y.'),
    short('Hai món hàng giá tổng 300 nghìn đồng. Món A giảm 10%, món B giảm 20%, thanh toán 252 nghìn đồng. Tìm giá gốc món A theo nghìn đồng.',120,'Trừ 0,8 lần phương trình x + y = 300 khỏi 0,9x + 0,8y = 252, được 0,1x = 12.')
  ]);

  book('g6-b27',2,32,[
    ['Hai chiều của bài toán phân số',[
      'Gọi A là lượng ban đầu, r là phân số và B là phần tương ứng. Biết A và r thì nhân. Biết B và r khác 0 thì chia để tìm A.',
      'Phân biệt phần của lượng ban đầu và phần của lượng còn lại. Sau mỗi bước, xác định lại lượng đang được coi là một đơn vị.'
    ],'B = A × r\nA = B : r, với r ≠ 0']
  ],[
    m('fraction-of-number','Tìm giá trị phân số của một số','Đề cho số ban đầu và hỏi một phần bằng phân số của số đó.',
      F`\text{Giá trị phần}=\text{Số ban đầu}×\frac{m}{n}`,
      ['Xác định số ban đầu và phân số ứng với phần cần tìm.','Chia số ban đầu cho mẫu rồi nhân với tử, hoặc nhân phân số rồi rút gọn.','Giữ nguyên đơn vị của số ban đầu.'],
      ['Tìm 3/8 của 56 m.',['Chia 56 thành 8 phần bằng nhau, được 7 m mỗi phần.','Lấy 3 phần, được 21 m.'],'21 m.'],
      short('Tìm 5/12 của 84 kg.',35,'Một phần mười hai của 84 kg là 7 kg. Năm phần bằng 35 kg.')),
    m('fraction-context','Tìm phần đã dùng và phần còn lại','Có dữ kiện sử dụng một phần của toàn bộ hoặc của lượng còn sau bước trước.',
      'Phần còn lại = lượng trước đó − phần đã dùng.',
      ['Ghi lượng đang làm mốc ở mỗi lần.','Tìm phần đã dùng bằng phép nhân.','Trừ phần đã dùng và cập nhật lượng làm mốc nếu còn bước sau.'],
      ['Có 60 lít nước, dùng 2/5 rồi dùng tiếp 1/3 lượng còn lại. Còn bao nhiêu lít?',['Sau lần đầu còn 60 − 24 = 36 lít.','Lần sau dùng 12 lít.'],'24 lít.'],
      short('Có 90 m vải, bán 1/3 số vải rồi bán tiếp 1/4 số còn lại. Còn bao nhiêu mét?',45,'Sau lần đầu còn 60 m. Lần sau bán 15 m nên còn 45 m.')),
    m('whole','Tìm số ban đầu khi biết giá trị một phân số','Đề cho phần đã biết, cần suy ra toàn bộ.',
      F`\text{Số ban đầu}=\text{Giá trị phần}:\frac{m}{n}`,
      ['Xác định phần đã cho chiếm bao nhiêu của toàn bộ.','Chia phần đã cho cho phân số tương ứng.','Thử lại bằng phép nhân.'],
      ['24 quả chiếm 3/7 số quả trong rổ. Hỏi rổ có bao nhiêu quả?',['Một phần là 24 : 3 = 8 quả.','Cả rổ gồm 7 phần.'],'56 quả.'],
      short('Đã đọc 28 trang, bằng 2/7 số trang của một quyển sách. Quyển sách có bao nhiêu trang?',98,'Một phần bằng 14 trang. Cả quyển gồm 7 phần nên có 98 trang.')),
    m('complement','Tìm số ban đầu qua phần còn lại','Đề cho phân số đã dùng nhưng số đo lại là phần còn lại.',
      'Phân số còn lại = 1 − phân số đã dùng.',
      ['Đổi phân số đã dùng sang phân số còn lại.','Lấy số lượng còn lại chia cho phân số còn lại.','Kiểm tra bằng cách tính phần đã dùng và cộng lại.'],
      ['Bán 3/5 số gạo, còn 18 kg. Tính số gạo lúc đầu.',['Phần còn là 2/5.','Tính 18 : (2/5) = 45.'],'45 kg.'],
      short('Dùng hết 3/8 số tiền thì còn 50 nghìn đồng. Ban đầu có bao nhiêu nghìn đồng?',80,'Phần còn lại là 5/8. Tính 50 : (5/8) = 80.'))
  ]);

  book('g7-b13',1,86,[
    ['Các yếu tố tương ứng',[
      'Kí hiệu tam giác ABC bằng tam giác DEF quy định A ứng với D, B ứng với E, C ứng với F. Các cạnh và góc tương ứng bằng nhau.',
      'Trường hợp cạnh – cạnh – cạnh dùng ba cặp cạnh tương ứng. Xác định thứ tự đỉnh từ các cặp cạnh rồi mới ghi tên hai tam giác.'
    ],'AB = DE, BC = EF, CA = FD ⇒ △ABC = △DEF']
  ],[
    m('correspondence','Xác định cạnh và góc tương ứng','Hai tam giác đã được cho bằng nhau bằng kí hiệu.',
      '△ABC = △DEF ⇒ A ↔ D, B ↔ E, C ↔ F',
      ['Ghép đỉnh theo thứ tự trong kí hiệu.','Ghép cạnh bằng cách thay hai đầu mút.','Ghép góc theo đỉnh giữa của kí hiệu góc.'],
      ['Cho △ABC = △HIK. Cạnh nào tương ứng với BC?',['B ứng với I và C ứng với K.'],'Cạnh IK.'],
      mcq('Cho △MNP = △QRS. Góc MPN tương ứng với góc nào?',['QRS','QSR','SQR','RQS'],1,'M → Q, P → S, N → R nên MPN → QSR.')),
    m('sss','Chứng minh hai tam giác bằng nhau theo cạnh – cạnh – cạnh','Tìm đủ ba cặp cạnh bằng nhau, có thể gồm một cạnh chung.',
      'Ba cặp cạnh tương ứng bằng nhau ⇒ hai tam giác bằng nhau.',
      ['Liệt kê cạnh nào bằng nhau theo giả thiết.','Tìm cạnh chung hoặc dùng tính chất đã biết cho cặp còn lại.','Ghi hai tam giác theo đúng thứ tự và nêu trường hợp cạnh – cạnh – cạnh.'],
      ['Hai tam giác ABC và ADC có AB = AD, CB = CD. Chứng minh chúng bằng nhau.',['AC là cạnh chung.','Ghép A với A, B với D và C với C.'],'△ABC = △ADC theo cạnh – cạnh – cạnh.'],
      mcq('Trong hai tam giác ABM và ACM, biết AB = AC, BM = CM. Dữ kiện nào hoàn tất chứng minh theo cạnh – cạnh – cạnh?',['AM = AM','AB ∥ AC','Góc BAM vuông','BC là cạnh chung'],0,'AM là cạnh của cả hai tam giác.')),
    m('equal-angle','Suy ra hai góc bằng nhau từ hai tam giác bằng nhau','Mỗi góc cần so sánh nằm trong một tam giác.',
      'Hai góc ở hai đỉnh tương ứng của hai tam giác bằng nhau thì bằng nhau.',
      ['Chọn hai tam giác chứa hai góc cần chứng minh.','Chứng minh chúng bằng nhau và ghi thứ tự đỉnh.','Đọc ra cặp góc tương ứng, rồi dùng thêm tính chất phân giác nếu đề yêu cầu.'],
      ['Nếu △ABM = △ACM, hãy giải thích vì sao AM là tia phân giác góc BAC khi M nằm trong góc.',['Góc BAM tương ứng với góc CAM.','Hai góc bằng nhau và AM nằm giữa AB, AC.'],'AM là tia phân giác góc BAC.'],
      mcq('Biết △ABP = △CDQ và góc BAP bằng 35°. Góc DCQ bằng bao nhiêu?',['35°','55°','70°','145°'],0,'B → D, A → C, P → Q nên BAP tương ứng DCQ.'))
  ]);

  add('g8-b6','https://thcs.toanmath.com/thcs-pdf/ly-thuyet-va-phan-dang-bai-tap-toan-8-hoc-ki-1-ngo-duc-tai.pdf','Phân dạng Toán 8 · Ngô Đức Tài',58,[
    ['Ba hằng đẳng thức',[
      'Nhận dạng đủ hai biểu thức A và B, kể cả khi một biểu thức có hệ số hoặc nhiều hạng tử.',
      'Trong bình phương của tổng hoặc hiệu, số hạng giữa là ±2AB. Trong hiệu hai bình phương, phải là phép trừ giữa hai bình phương.'
    ],'(A + B)² = A² + 2AB + B²\n(A − B)² = A² − 2AB + B²\nA² − B² = (A − B)(A + B)']
  ],[
    m('mental-identity','Tính nhanh bằng hằng đẳng thức','Hai số gần một mốc tròn hoặc là một cặp tổng và hiệu.',
      '(a − b)(a + b) = a² − b²',
      ['Tìm mốc ở giữa hai thừa số hoặc mốc tròn gần số cần bình phương.','Viết lại các số thành A + B và A − B theo đúng trường hợp.','Tính từng bình phương rồi cộng hoặc trừ.'],
      ['Tính 98 × 102.',['98 = 100 − 2, 102 = 100 + 2.','Lấy 100² − 2².'],'9 996.'],
      short('Tính 47 × 53 bằng hằng đẳng thức.',2491,'Hai số là 50 − 3 và 50 + 3. Tính 50² − 3² = 2 491.')),
    m('simplify-identity','Rút gọn rồi tính giá trị biểu thức','Biểu thức có bình phương hoặc tích của tổng và hiệu.',
      '(A + B)² − (A − B)² = 4AB',
      ['Khai triển từng nhóm, giữ dấu trừ phía trước ngoặc.','Gộp các hạng tử đồng dạng.','Thay giá trị biến vào biểu thức đã rút gọn.'],
      ['Tính (x + 2)² − (x − 2)² tại x = 3.',['Thu gọn được 8x.','Thay x = 3.'],'24.'],
      short('Tính (x + 3)² − (x − 3)² tại x = −2.',-24,'Hiệu hai bình phương của tổng và hiệu bằng 4 × x × 3 = 12x.')),
    m('independent','Chứng minh biểu thức không phụ thuộc biến','Cần chỉ ra sau khi rút gọn, mọi hạng tử chứa biến đều triệt tiêu.',
      '(x + a)² − x² − 2ax = a²',
      ['Khai triển biểu thức.','Gộp và kiểm tra hệ số của từng hạng tử chứa biến bằng 0.','Kết luận giá trị còn lại là hằng số với mọi giá trị cho phép.'],
      ['Giải thích vì sao (x − 2)² − x² + 4x không phụ thuộc x.',['Khai triển được x² − 4x + 4 − x² + 4x.'],'Chỉ còn 4.'],
      short('Giá trị không đổi của (x + 5)² − x² − 10x bằng bao nhiêu?',25,'Sau khi khai triển, x² và 10x triệt tiêu.')),
    m('identity-proof','Chứng minh đẳng thức','Cần biến đổi một vế thành vế kia hoặc cả hai về cùng dạng.',
      'Dùng hằng đẳng thức đúng với mọi A, B.',
      ['Chọn vế có dạng dễ khai triển hơn.','Áp dụng hằng đẳng thức rồi thu gọn.','Đối chiếu với vế còn lại và nêu đẳng thức đúng với mọi giá trị xác định.'],
      ['Chứng minh (x + y)² + (x − y)² = 2(x² + y²).',['Khai triển hai bình phương.','Hai hạng tử 2xy trái dấu triệt tiêu.'],'Hai vế cùng bằng 2x² + 2y².'],
      mcq('Đẳng thức nào đúng với mọi x?',['(x − 1)² = x² − 1','(x + 1)² = x² + 1','(x − 1)(x + 1) = x² − 1','(x − 1)² = x² − 2x − 1'],2,'Dùng hiệu hai bình phương với A = x, B = 1.')),
    m('extreme-square','Tìm giá trị lớn nhất hoặc nhỏ nhất bằng bình phương','Biểu thức bậc hai có thể viết thành một bình phương cộng hằng số.',
      '(x − a)² ≥ 0, đạt 0 khi x = a.',
      ['Hoàn thành bình phương, ghi hệ số đứng trước bình phương.','Nếu hệ số dương thì tìm giá trị nhỏ nhất. Nếu âm thì tìm giá trị lớn nhất.','Chỉ rõ điều kiện xảy ra dấu bằng.'],
      ['Tìm giá trị nhỏ nhất của x² − 6x + 14.',['Viết thành (x − 3)² + 5.'],'Bằng 5 khi x = 3.'],
      short('Tìm giá trị lớn nhất của −x² + 8x − 5.',11,'Viết biểu thức thành 11 − (x − 4)². Giá trị lớn nhất là 11 khi x = 4.'))
  ]);

  book('g9-b9',1,76,[
    ['Biến đổi căn thức và điều kiện',[
      'Căn bậc hai số học luôn không âm. Với biểu thức A, căn của A² bằng |A|. Căn ở mẫu phải xác định và khác 0.',
      'Chỉ gộp các căn khi dùng được quy tắc tích hoặc thương với điều kiện dấu thích hợp. Rút gọn rồi vẫn giữ điều kiện ban đầu.'
    ],F`\sqrt{a²b}=|a|\sqrt{b}, b≥0
\frac{1}{\sqrt{b}}=\frac{\sqrt{b}}{b}, b>0`],
    ['Liên hợp',[
      'Khi mẫu là tổng hoặc hiệu hai căn, nhân cả tử lẫn mẫu với liên hợp. Điều kiện mẫu ban đầu khác 0 cần được kiểm tra trước.'
    ],F`(\sqrt{a}−\sqrt{b})(\sqrt{a}+\sqrt{b})=a−b`]
  ],[
    m('extract','Đưa thừa số ra ngoài dấu căn','Biểu thức lấy căn có nhân tử là bình phương.',
      F`\sqrt{a²b}=|a|\sqrt{b}`,
      ['Tách một bình phương khỏi biểu thức dưới dấu căn.','Đưa căn của bình phương ra dưới dạng trị tuyệt đối.','Xét dấu của nhân tử theo điều kiện trước khi bỏ trị tuyệt đối.'],
      ['Rút gọn √(18x²) khi x ≤ 0.',['18x² = (3x)² × 2.','Vì x ≤ 0, |3x| = −3x.'],'−3x√2.'],
      mcq('Với x < 2, biểu thức √(5(x − 2)²) bằng gì?',['(x − 2)√5','(2 − x)√5','5(2 − x)','−(2 − x)√5'],1,'Căn của (x − 2)² là |x − 2| = 2 − x.')),
    m('insert','Đưa thừa số vào trong dấu căn','Cần viết tích của một hệ số với căn thành một căn duy nhất.',
      F`a\sqrt{b}=\sqrt{a²b}\text{ nếu }a≥0;\quad a\sqrt{b}=−\sqrt{a²b}\text{ nếu }a<0`.replaceAll('\\quad ',' '),
      ['Xác định dấu của hệ số bên ngoài.','Bình phương độ lớn của hệ số rồi nhân vào số dưới căn.','Nếu hệ số ban đầu âm, giữ dấu trừ phía ngoài.'],
      ['Viết −3√2 thành một căn có dấu trừ ở ngoài.',['Bình phương 3 được 9.','Đưa 9 vào trong, giữ dấu âm.'],'−√18.'],
      mcq('Biểu thức −2√7 bằng gì?',['√28','−√14','−√28','√14'],2,'Bình phương hệ số 2 rồi nhân 7, giữ dấu trừ ngoài căn.')),
    m('remove-radicand-denominator','Khử mẫu của biểu thức dưới dấu căn','Trong dấu căn có phân số mà mẫu chưa là số chính phương.',
      F`\sqrt{\frac{a}{b}}=\frac{\sqrt{ab}}{b}, a≥0, b>0`,
      ['Đưa mẫu của phân số về bình phương bằng cách nhân cả tử và mẫu với b.','Tách căn của mẫu.','Rút gọn thêm nếu tử có nhân tử chính phương.'],
      ['Khử mẫu của √(3/5).',['Nhân trong căn được 15/25.','Lấy căn mẫu được 5.'],'√15/5.'],
      mcq('Biểu thức √(2/7) bằng gì?',['√14/7','√14/2','√2/7','√14/49'],0,'Trong căn 2/7 = 14/49. Căn mẫu bằng 7.')),
    m('rationalize','Trục căn thức ở mẫu','Căn nằm ở mẫu của một phân thức.',
      F`\frac{1}{\sqrt{a}+\sqrt{b}}=\frac{\sqrt{a}−\sqrt{b}}{a−b}\text{ khi }a,b≥0, a≠b`,
      ['Kiểm tra mẫu xác định và khác 0.','Nếu mẫu là một căn, nhân với căn đó. Nếu mẫu là tổng hoặc hiệu, dùng liên hợp.','Rút gọn mẫu và kiểm tra mẫu mới không làm thay đổi miền đã có.'],
      ['Trục căn ở mẫu của 1/(√5 − 2).',['Nhân tử và mẫu với √5 + 2.','Mẫu mới bằng 5 − 4 = 1.'],'√5 + 2.'],
      mcq('Biểu thức 2/(√7 + √5) bằng gì?',['√7 + √5','√7 − √5','2√7 − 2√5','1'],1,'Nhân với liên hợp √7 − √5. Mẫu 7 − 5 = 2, rút gọn với tử 2.')),
    m('compare-radicals','So sánh hai biểu thức chứa căn','Có thể đưa về hai căn không âm hoặc so sánh với một số không âm.',
      'Nếu A, B ≥ 0 thì A < B ⇔ A² < B².',
      ['Xét dấu trước khi bình phương.','Nếu cả hai không âm, tính bình phương hoặc đưa cùng dạng căn.','So sánh rồi kết luận đúng chiều.'],
      ['So sánh 3√2 và 2√5.',['Hai số dương, bình phương lần lượt là 18 và 20.'],'3√2 < 2√5.'],
      mcq('So sánh 2√6 và 3√3.',['2√6 < 3√3','2√6 > 3√3','Hai số bằng nhau','Không so sánh được'],0,'Hai số dương. Bình phương 24 nhỏ hơn 27.')),
    m('combine-radicals','Rút gọn tổng và hiệu các căn','Các căn có thể đưa về cùng phần dưới dấu căn.',
      'a√b + c√b = (a + c)√b.',
      ['Tách nhân tử chính phương khỏi từng căn.','Nhóm đúng các căn có cùng phần dưới dấu căn.','Cộng hoặc trừ các hệ số, giữ phần căn chung.'],
      ['Rút gọn √75 − √12 + √3.',['Đổi thành 5√3 − 2√3 + √3.'],'4√3.'],
      short('Rút gọn 2√50 − √8 − √18 thành k√2. Tìm k.',5,'Các căn lần lượt là 5√2, 2√2, 3√2. Hệ số là 10 − 2 − 3 = 5.')),
    m('radical-fraction','Rút gọn phân thức chứa căn','Có mẫu chứa căn và biến, có thể phân tích nhân tử theo √x.',
      F`x−a²=(\sqrt{x}−a)(\sqrt{x}+a),\ x≥0`,
      ['Ghi điều kiện của từng căn và từng mẫu.','Đặt t = √x nếu cách viết theo t làm lộ nhân tử.','Rút gọn nhân tử khác 0 rồi thay số hoặc giải yêu cầu tiếp theo trên điều kiện cũ.'],
      ['Rút gọn (x − 9)/(√x − 3).',['Điều kiện x ≥ 0 và x ≠ 9.','Phân tích tử thành (√x − 3)(√x + 3).'],'√x + 3 với x ≥ 0 và x ≠ 9.'],
      short('Cho P = (x − 16)/(√x − 4) với x ≥ 0, x ≠ 16. Tính P khi x = 25.',9,'Sau rút gọn P = √x + 4. Thay x = 25 được 9.')),
    m('radical-identity','Chứng minh đẳng thức chứa căn','Mục tiêu là biến đổi về cùng biểu thức trên miền xác định.',
      F`\sqrt{u²}=|u|`,
      ['Xác định miền mà hai vế có nghĩa.','Biến đổi vế có căn phức tạp, dùng trị tuyệt đối khi khai căn bình phương.','Nếu muốn kiểm tra bằng bình phương, chứng minh hai vế cùng không âm trước.'],
      ['Chứng minh √(x² + 4x + 4) = x + 2 khi x ≥ −2.',['Biểu thức dưới căn là (x + 2)².','Vì x + 2 ≥ 0 nên |x + 2| = x + 2.'],'Đẳng thức đúng trên miền đã cho.'],
      mcq('Đẳng thức nào đúng với mọi x thực?',['√(x²) = x','√(x²) = −x','√(x² + 2x + 1) = |x + 1|','√(x² + 1) = |x| + 1'],2,'Biểu thức x² + 2x + 1 là (x + 1)². Căn số học lấy trị tuyệt đối.'))
  ]);

  l10(23,779,[
    ['Chọn cách đếm',[
      'Quy tắc cộng áp dụng khi chọn một trong nhiều trường hợp loại trừ nhau. Nếu các trường hợp giao nhau, tách thành trường hợp rời hoặc trừ phần giao.',
      'Quy tắc nhân áp dụng khi một kết quả hoàn thành qua nhiều bước liên tiếp. Đếm số cách ở mỗi bước với các điều kiện đã chọn.'
    ],'Cộng các trường hợp rời. Nhân số cách của các bước nối tiếp.']
  ],[
    m('addition','Quy tắc cộng','Chọn đúng một phương án từ nhiều nhóm không trùng nhau.',
      'N = n₁ + n₂ + …',
      ['Tách bài thành những trường hợp không giao nhau.','Đếm trong từng trường hợp.','Cộng các kết quả.'],
      ['Có 5 đề Toán và 3 đề Vật lí. Chọn đúng một đề.',['Hai loại đề rời nhau.'],'5 + 3 = 8 cách.'],
      short('Có 7 xe buýt và 4 tàu có thể đi tới cùng một nơi. Chọn một chuyến, có bao nhiêu cách?',11,'Mỗi lựa chọn thuộc đúng một phương tiện. Cộng 7 + 4.')),
    m('multiplication','Quy tắc nhân','Mỗi phương án cần thực hiện đủ nhiều bước nối tiếp.',
      'N = n₁ × n₂ × …',
      ['Ghi các bước hoàn thành một phương án.','Đếm số cách ở mỗi bước, xét các lựa chọn trước đó.','Nhân số cách nếu số lựa chọn mỗi bước cố định.'],
      ['Có 4 áo, 3 quần và 2 đôi giày. Chọn một bộ gồm mỗi loại một món.',['Có 4, 3, 2 cách lần lượt.'],'24 bộ.'],
      short('Một mã có một chữ cái chọn từ A, B, C rồi hai chữ số, hai chữ số khác nhau. Có bao nhiêu mã?',270,'Có 3 cách chọn chữ, 10 cách chọn chữ số đầu và 9 cách chọn chữ số sau.')),
    m('digit-count','Đếm số theo điều kiện chữ số','Cần quan tâm chữ số đầu, chữ số cuối và việc có lặp hay không.',
      'Chữ số đầu của số có nhiều chữ số khác 0.',
      ['Điền vị trí bị ràng buộc nhất trước.','Đếm vị trí đầu và những vị trí còn lại theo điều kiện.','Tách trường hợp rời nếu số cách ở các bước thay đổi.'],
      ['Có bao nhiêu số chẵn hai chữ số khác nhau từ 0, 1, 2, 3?',['Tận cùng 0 cho 3 cách, tận cùng 2 cho 2 cách.'],'5 số.'],
      short('Có bao nhiêu số lẻ có hai chữ số khác nhau lập từ 0, 1, 2, 3, 4?',6,'Tận cùng có 2 cách (1 hoặc 3). Với mỗi cách, hàng chục có 3 cách vì khác 0 và khác hàng đơn vị.')),
    m('objects','Chọn đồ vật có điều kiện','Đề cho nhiều loại đồ vật và yêu cầu chọn theo đúng thành phần.',
      'Chọn mỗi loại một vật: nhân số cách của các loại.',
      ['Liệt kê các thành phần được phép trong một lựa chọn.','Đếm cách chọn trong từng loại của một trường hợp.','Nếu có nhiều thành phần khác nhau, cộng số cách của các trường hợp rời.'],
      ['Chọn một sách Toán trong 4 sách và một sách Văn trong 3 sách.',['Chọn đủ hai loại.'],'12 cách.'],
      short('Có 5 vở xanh, 4 vở đỏ và 3 bút. Chọn đúng một vở và một bút. Có bao nhiêu cách?',27,'Có 5 + 4 = 9 cách chọn vở và 3 cách chọn bút, được 27.')),
    m('seating','Sắp xếp vào các vị trí','Thứ tự quan trọng, một người hoặc vật thường chỉ dùng một lần.',
      'Sau khi chọn một người, số người còn lại giảm đi một.',
      ['Xử lí vị trí có điều kiện trước.','Điền các vị trí còn lại và cập nhật số lựa chọn sau mỗi lần.','Nhân số cách, kiểm tra xem có trường hợp nào bị đếm hai lần.'],
      ['Sắp 4 người vào 4 ghế hàng ngang, A ngồi ghế đầu.',['Ghế đầu cố định.','Ba ghế còn 3, 2 và 1 cách.'],'6 cách.'],
      short('Xếp 5 bạn thành một hàng. Bạn An đứng ở một trong hai đầu. Có bao nhiêu cách?',48,'Chọn đầu cho An có 2 cách. Xếp 4 bạn còn lại có 4 × 3 × 2 × 1 = 24 cách.'))
  ]);

  book('g11-b9',1,83,[
    ['Số trung bình và giá trị đại diện',[
      'Mỗi lớp [a; b) được đại diện bằng trung điểm (a + b)/2. Nhân trung điểm với tần số lớp rồi chia tổng cho cỡ mẫu.',
      'Số trung bình tính từ bảng ghép nhóm là giá trị xấp xỉ.'
    ],F`\bar{x}=\frac{x₁n₁+x₂n₂+\cdots+x_kn_k}{n₁+n₂+\cdots+n_k}`.replaceAll('\\bar{x}','x̄').replaceAll('\\cdots','…')],
    ['Trung vị và tứ phân vị',[
      'Dùng tần số tích lũy để tìm lớp chứa vị trí k, lần lượt là n/4, n/2 và 3n/4. Lấy lớp đầu tiên mà tần số tích lũy đạt đến vị trí đó.',
      'Gọi L là đầu trái của lớp, C là số giá trị trước lớp, f là tần số lớp và h là độ rộng lớp. Nội suy từ đầu trái.'
    ],F`Q=L+\frac{k−C}{f}h`],
    ['Mốt của mẫu ghép nhóm',[
      'Trong bài có các lớp cùng độ rộng, chọn lớp có tần số lớn nhất. Gọi f là tần số lớp mốt, f₁ và f₂ là tần số lớp liền trước và sau. Nếu mốt nằm ở lớp đầu hoặc cuối, lấy tần số của lớp ngoài bảng bằng 0.',
      'Mốt là giá trị ước lượng trong lớp mốt. Nếu các lớp cùng đạt tần số cao nhất thì nêu rõ sự đồng hạng, kiểm tra mẫu của công thức trước khi dùng.'
    ],F`M_o=L+\frac{f−f₁}{(f−f₁)+(f−f₂)}h`]
  ],[
    m('median','Tính trung vị của mẫu ghép nhóm','Tìm mức chia mẫu thành hai nửa theo thứ tự.',
      F`M_e=L+\frac{n/2−C}{f}h`,
      ['Cộng tần số để tính n và tìm vị trí n/2.','Tìm lớp chứa vị trí này bằng tần số tích lũy.','Thế đúng đầu trái, tần số tích lũy trước lớp, tần số lớp và độ rộng.'],
      ['Các lớp [0;10), [10;20), [20;30) có tần số 3, 8, 5. Tính trung vị.',['n = 16. Vị trí 8 thuộc lớp thứ hai, có C = 3 và f = 8.','Tính 10 + (8 − 3) × 10/8.'],'16,25.'],
      short('Ba lớp [0; 10), [10; 20), [20; 30) có tần số 4, 10, 6. Tính trung vị xấp xỉ.',16,'Vị trí n/2 = 10 thuộc lớp [10; 20), với C = 4. Nội suy 10 + (10 − 4) × 10/10 = 16.')),
    m('quartile','Tìm tứ phân vị từ tần số tích lũy','Đề hỏi Q₁, Q₃ hoặc cần chúng để mô tả mức phân tán.',
      F`k=\frac{n}{4}\text{ cho }Q₁,\quad k=\frac{3n}{4}\text{ cho }Q₃`.replaceAll('\\quad ',' '),
      ['Tính vị trí tứ phân vị cần tìm.','Tìm lớp chứa vị trí từ tần số tích lũy, không nhầm với tần số của một lớp.','Nội suy bằng đúng độ rộng của lớp đang dùng.'],
      ['Các lớp [0;5), [5;10), [10;15) có tần số 4, 8, 8. Tính Q₃.',['n = 20, vị trí 15 nằm trong lớp thứ ba.','Tính 10 + (15 − 12) × 5/8.'],'Q₃ = 11,875.'],
      short('Các lớp [10; 20), [20; 30), [30; 40) có tần số 2, 8, 6. Tìm Q₁ xấp xỉ.',22.5,'Vị trí n/4 = 4 thuộc lớp [20; 30), với C = 2. Tính 20 + (4 − 2) × 10/8 = 22,5.','22,5')),
    m('mean','Tính số trung bình theo giá trị đại diện','Đề hỏi giá trị trung bình từ bảng khoảng và tần số.',
      F`x̄=\frac{\text{tổng trung điểm nhân tần số}}{\text{tổng tần số}}`,
      ['Tính trung điểm của từng lớp.','Nhân mỗi trung điểm với tần số tương ứng rồi cộng.','Chia cho tổng tần số và làm tròn ở bước cuối nếu được yêu cầu.'],
      ['Lớp [0; 10) có 3 giá trị, lớp [10; 20) có 7 giá trị. Tính trung bình.',['Hai trung điểm là 5 và 15.','Tính (3 × 5 + 7 × 15)/10.'],'12.'],
      short('Các lớp [0; 4), [4; 8), [8; 12) có tần số 2, 3, 5. Tính trung bình xấp xỉ.',7.2,'Các trung điểm là 2, 6, 10. Tử bằng 4 + 18 + 50 = 72, mẫu bằng 10.','7,2')),
    m('mode','Xác định lớp mốt và nội suy mốt','Đề hỏi giá trị phổ biến nhất ước lượng từ các lớp có cùng độ rộng.',
      F`M_o=L+\frac{f−f₁}{(f−f₁)+(f−f₂)}h`,
      ['Chọn lớp có tần số lớn nhất.','Lấy hiệu giữa tần số lớp mốt với hai lớp kề.','Thay vào công thức và kiểm tra kết quả nằm trong lớp mốt.'],
      ['Các lớp [0; 5), [5; 10), [10; 15) có tần số 4, 10, 4. Tính mốt.',['Lớp mốt là lớp giữa, hai hiệu đều bằng 6.','Cộng nửa độ rộng vào 5.'],'7,5.'],
      short('Các lớp [0; 10), [10; 20), [20; 30) có tần số 3, 9, 7. Tính mốt xấp xỉ.',17.5,'Hiệu trước là 9 − 3 = 6, hiệu sau là 9 − 7 = 2. Tính 10 + 6/(6 + 2) × 10 = 17,5.','17,5'))
  ]);

  book('g12-b3',1,80,[
    ['Tiệm cận đứng',[
      'Đường x = a là tiệm cận đứng nếu có ít nhất một giới hạn một phía của f(x) tại a bằng +∞ hoặc −∞.',
      'Mẫu bằng 0 chỉ cho một điểm cần kiểm tra. Nếu sau rút gọn, hàm tiến tới một giá trị hữu hạn tại điểm loại thì đồ thị có thể chỉ bị khuyết điểm.'
    ],'x = a khi f(x) tiến ra vô cực từ ít nhất một phía của a.'],
    ['Tiệm cận ngang và xiên',[
      'Tính riêng khi x tiến về +∞ và −∞. Nếu giới hạn của f(x) bằng b thì y = b là tiệm cận ngang theo hướng đó.',
      'Nếu f(x) − (ax + b) tiến tới 0 và a khác 0, y = ax + b là tiệm cận xiên. Với phân thức có tử hơn mẫu đúng một bậc, chia đa thức để tìm thương.'
    ],'y = ax + b khi hiệu f(x) − (ax + b) tiến tới 0.']
  ],[
    m('chart-asymptotes','Đọc tiệm cận từ bảng biến thiên hoặc đồ thị','Tìm các giới hạn tại điểm loại và hai đầu của trục x.',
      'Giới hạn vô cực tại x = a ⇒ tiệm cận đứng x = a.',
      ['Đọc hai đầu x tiến về ±∞ để tìm tiệm cận ngang.','Xem các điểm ngắt trong miền để tìm giới hạn vô cực và tiệm cận đứng.','Đếm mỗi đường thẳng phân biệt một lần.'],
      ['Cho f(x) tiến tới 3 ở cả hai đầu ±∞, và f(x) tiến tới −∞ khi x tiến tới 2 từ trái.',['Hai đầu cho cùng y = 3.','Một phía đã đủ kết luận x = 2 là tiệm cận đứng.'],'Xác định được hai đường y = 3 và x = 2.'],
      mcq('Khi x tiến tới +∞, f(x) tiến tới 1. Khi x tiến tới −∞, f(x) tiến tới −1. Đồ thị có bao nhiêu tiệm cận ngang?',['0','1','2','3'],2,'Hai giới hạn hữu hạn khác nhau cho hai đường y = 1 và y = −1.')),
    m('function-asymptotes','Tìm tiệm cận từ công thức hàm số','Dùng giới hạn hoặc chia đa thức, kiểm tra nhân tử triệt tiêu.',
      'f(x) = ax + b + R(x), với R(x) tiến tới 0 ⇒ y = ax + b.',
      ['Tìm tập xác định và các điểm mẫu bằng 0.','Rút gọn và tính giới hạn một phía tại điểm loại để kiểm tra tiệm cận đứng.','Tính giới hạn ở vô cực hoặc chia đa thức để tìm tiệm cận ngang, xiên.'],
      ['Tìm tiệm cận đứng của (x² − 4)/((x − 2)(x + 3)).',['Với x khác 2 và −3, rút gọn thành (x + 2)/(x + 3).','Tại 2 giới hạn hữu hạn. Tại −3 mẫu bằng 0 và tử khác 0.'],'Chỉ có x = −3.'],
      short('Tiệm cận xiên của y = (3x² − x + 2)/(x − 1) là y = ax + b. Tìm a + b.',5,'Chia đa thức được 3x + 2 + 4/(x − 1). Do đó a + b = 3 + 2.')),
    m('geometry-asymptotes','Tính khoảng cách hoặc diện tích liên quan đến tiệm cận','Tìm phương trình từng tiệm cận trước khi xử lí hình học.',
      'Khoảng cách từ (x₀; y₀) đến x = a bằng |x₀ − a|.',
      ['Tìm đúng tiệm cận và ghi phương trình.','Xác định các giao điểm hoặc khoảng cách từ các tọa độ đã cho.','Thay vào công thức góc, độ dài hoặc diện tích theo đề.'],
      ['Với hai tiệm cận x = 4, y = 3 và hai trục tọa độ, tính diện tích hình chữ nhật tạo bởi bốn đường.',['Hai kích thước là 4 và 3.'],'Diện tích 12.'],
      short('Đồ thị có tiệm cận x = −5 và y = 2. Tính diện tích hình chữ nhật giới hạn bởi hai tiệm cận và hai trục tọa độ.',10,'Khoảng cách đến hai trục lần lượt là 5 và 2. Diện tích bằng 10.')),
    m('limit-context','Giải thích tiệm cận trong mô hình thực tế','Một đại lượng tiến sát ngưỡng khi thời gian hoặc quy mô tăng.',
      'A(t) = L + R(t), R(t) tiến tới 0 ⇒ A(t) tiến tới L.',
      ['Viết mô hình và ghi miền có ý nghĩa thực tế.','Tính giới hạn theo hướng mà mô hình cho phép, thường là t tiến về +∞.','Diễn giải ngưỡng bằng đúng đơn vị, phân biệt tiến gần với bằng ngưỡng.'],
      ['Mức tiêu hao bình quân có dạng C(n) = 8 + 24/n với n > 0. Đọc ngưỡng dài hạn.',['Khi n tăng, 24/n tiến tới 0 và vẫn dương.'],'Tiến gần 8 từ phía trên.'],
      short('Một cảm biến đo T(t) = 22 + 12/(t + 1) độ C, t ≥ 0. Khi thời gian tăng mãi, nhiệt độ tiến gần bao nhiêu độ C?',22,'Phân số 12/(t + 1) tiến tới 0, nên nhiệt độ tiến gần 22°C.'))
  ],[],'holeGraph');

  return lessons;
})();

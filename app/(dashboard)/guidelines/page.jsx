'use client'

export default function Guide(){
    const contents = [{title: "Koneksi Website Fitur Device Control (Button) dengan ESP32 (Hardware)", description: ["Pertama tambahkan button pada halaman Device Control.", "Kedua siapkan kode ESP32 di Arduino IDE atau teks editor yang lain.", "Kode ESP32 tersebut harus sebagai subscriber (penerima data) karena website sudah menjadi publisher.", "Ketiga install library Arduino IDE yang utama yaitu Wifi dan Pubsubclient.", "Keempat pastikan konfigurasi wifi sudah sesuai (name dan passwordnya).", "Kelima pastikan topic (path) example: /send/button/12 , sudah sama dengan yang ada di “Configuration” Device Control button yang ingin digunakan.", "Kemudian upload kode tersebut ke ESP32 dan lakukan pengujian dengan ON/OFF button dengan id yang sesuai, di halaman Device Control. "]}, {title: "Edit Path/Topic MQTT", description: ['Pertama buka VSCODE kode website tersebut kemudian buka file “.env.local”.', 'Kedua edit saja nilai dari variabel “NEXT_PUBLIC_PATH_PUBLISHER_WEBSITE=” (Ini untuk topic/path Website sebagai publisher dan ESP32 sebagai subscriber).', 'Ketiga edit saja nilai dari variabel “NEXT_PUBLIC_PATH_PUBLISHER_HARDWARE=” (Ini untuk topic/path ESP32 sebagai publisher dan Website sebagai subscriber).', 'Sesuaikan nama topic/path dengan yang diinginkan, secara default topic/path depannya berupa “/unnes/iot” dan “/unnes/iot-e”.', 'Setelah melakukan perubahan, lakukan save dengan “ctrl + s” pada halaman “.env.local”.']}, {title: "Edit MQTT Broker", description: ['Langkahnya sama seperti edit path/topic mqtt yaitu buka file “.env.local”.', 'Edit saja nilai dari variabel “NEXT_PUBLIC_PATH_URL_BROKER_MQTT=” dengan broker mqtt yang diinginkan.', 'Setelah melakukan perubahan, lakukan save dengan “ctrl + s” pada halaman “.env.local”.']}]
    return(
        <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-8">
              {/* Header */}
              <div className="border-b border-slate-800 pb-6">
              <div>
                <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold">Guidelines "How to Use this Website"</h1>
                <p className="text-slate-200/70 font-notosans font-light text-sm mt-2">
                  You can follow step by step bellow, to use button or custome some part in this website.
                </p>
              </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl mb-10">
                <div className="flex flex-col gap-8">
                {contents.map((item, index)=>(
                    <div key={index} className="flex flex-col gap-3">
                        <h3 className="font-notosans font-medium text-slate-200 text-xl">{index + 1}). {item.title}</h3>
                        <ul className="flex flex-col gap-2 pl-4 lg:pl-10">
                            {item.description.map((item, index)=>(
                                <li key={index} className="font-notosans font-light text-sm text-slate-200 list-decimal">{item}</li>
                            ))}       
                        </ul>
                    </div>
                ))}
                </div>
              </div>
        
            </div>
    )
}
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()


export async function POST(request) {
    const patientData = await request.json();

    // console.log(patientData)
    const patient = await prisma.patient.upsert({
        where: {
            patientName: patientData.name,
        },
        update: {
            scheduleDate: patientData.day,
            scheduleTime: patientData.time
        },
        create: {
            patientName: patientData.name,
            scheduleDate: patientData.day,
            scheduleTime: patientData.time
        }
    })
    // const doctor = await prisma.doctor.create({
    //     scheduleDate: JSON.stringify({
    //         [patientData.day]: patientData.time
    //     }),
    //     patientName: patientData.name
    // })
    // console.log('first', patient)
    return NextResponse.json(patient, { status: 200 })
}
// jsom stringify ? patint date
/*
{date : time }
*/
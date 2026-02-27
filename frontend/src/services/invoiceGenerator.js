import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function numberToWords(num) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (num === 0) return 'Zero';

    let words = '';

    if (Math.floor(num / 1000) > 0) {
        words += ones[Math.floor(num / 1000)] + ' Thousand ';
        num %= 1000;
    }
    if (Math.floor(num / 100) > 0) {
        words += ones[Math.floor(num / 100)] + ' Hundred ';
        num %= 100;
    }
    if (num > 0) {
        if (num < 20) {
            words += ones[num];
        } else {
            words += tens[Math.floor(num / 10)];
            if (num % 10 > 0) words += ' ' + ones[num % 10];
        }
    }

    return words.trim() + ' Rupees only';
}

export function generateInvoice(order) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;

    // Colors
    const green = [5, 150, 105];
    const darkGray = [51, 51, 51];
    const lightGray = [245, 245, 245];
    const borderColor = [200, 200, 200];

    let y = 20;

    // ===== OUTER BORDER =====
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(0.5);
    doc.rect(margin, margin, contentWidth, 265);

    // ===== HEADER SECTION =====
    // Company Info (left side)
    const headerLeft = margin;
    const headerMid = margin + contentWidth * 0.55;

    // RuSH Logo
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...green);
    doc.text('RuSH', headerLeft + 4, y + 10);

    // Company Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.text('Rush Enterprises', headerLeft + 40, y + 2);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Flat 31/12 Sector 12 old Faridabad', headerLeft + 40, y + 7);
    doc.text('Haryana 220017', headerLeft + 40, y + 11);
    doc.text('Ph No : 6655887799, 8877996688', headerLeft + 40, y + 15);
    doc.text('Email: Rush@gmail.com', headerLeft + 40, y + 19);
    doc.text('GSTIN: 07AA235AH25879', headerLeft + 40, y + 23);

    // Right side - Invoice details grid
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(0.3);

    // Invoice No & Date row
    doc.rect(headerMid, y - 2, contentWidth * 0.225, 14);
    doc.rect(headerMid + contentWidth * 0.225, y - 2, contentWidth * 0.225, 14);

    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text('Invoice No', headerMid + 3, y + 2);
    doc.text('Date', headerMid + contentWidth * 0.225 + 3, y + 2);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    const invoiceNo = order.id ? order.id.slice(-3) : '101';
    doc.text(invoiceNo, headerMid + 3, y + 9);

    const orderDate = order.date ? new Date(order.date) : new Date();
    const dateStr = orderDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) + ', ' + orderDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    doc.text(dateStr, headerMid + contentWidth * 0.225 + 3, y + 9);

    // Payment Mode row
    doc.rect(headerMid, y + 12, contentWidth * 0.45, 14);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('Payment Mode', headerMid + 3, y + 16);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.text(order.paymentMode || 'Cash On Delivery', headerMid + 3, y + 23);

    // Delivery Location & Date row
    doc.rect(headerMid, y + 26, contentWidth * 0.225, 14);
    doc.rect(headerMid + contentWidth * 0.225, y + 26, contentWidth * 0.225, 14);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('Delivery Location', headerMid + 3, y + 30);
    doc.text('Delivery Date', headerMid + contentWidth * 0.225 + 3, y + 30);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.text(order.deliveryAddress || 'Faridabad', headerMid + 3, y + 37);
    doc.text(orderDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }), headerMid + contentWidth * 0.225 + 3, y + 37);

    y += 44;

    // ===== BILL TO / SHIP TO SECTION =====
    doc.setDrawColor(...borderColor);
    doc.line(margin, y, margin + contentWidth, y);
    y += 4;

    // Bill To (left)
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('Bill To', headerLeft + 4, y + 2);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.text('Abhishek Sharma', headerLeft + 4, y + 8);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('House no 12/12 Sector 13 faridabad old haryana 220012', headerLeft + 4, y + 13);
    doc.text('Contact no : 9977885566', headerLeft + 4, y + 17);
    doc.text('Email : shekAbhi@gmail.com', headerLeft + 4, y + 21);

    // Ship To (right)
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('Ship To', headerMid + 3, y + 2);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.text('Manan Verma', headerMid + 3, y + 8);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('House no 12/12 Sector 13 faridabad old haryana 220012', headerMid + 3, y + 13);
    doc.text('Contact no : 9977885566', headerMid + 3, y + 17);

    y += 28;
    doc.line(margin, y, margin + contentWidth, y);
    y += 2;

    // ===== ITEMS TABLE =====
    const tableColumns = ['#', 'Item Name', 'Price', 'Discount', 'Quantity', 'Total'];
    const tableRows = order.items.map((item, idx) => [
        idx + 1,
        item.name,
        item.price,
        order.summary.discount || 30,
        item.quantity,
        item.total
    ]);

    const table = autoTable(doc, {
        startY: y,
        head: [tableColumns],
        body: tableRows,
        margin: { left: margin + 1, right: margin + 1 },
        styles: {
            fontSize: 9,
            cellPadding: 6,
            lineColor: [...borderColor],
            lineWidth: 0.3,
            textColor: [...darkGray],
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [...darkGray],
            fontStyle: 'bold',
            lineColor: [...borderColor],
            lineWidth: 0.3,
        },
        columnStyles: {
            0: { cellWidth: 15, halign: 'center' },
            1: { cellWidth: 55 },
            2: { cellWidth: 25, halign: 'center' },
            3: { cellWidth: 25, halign: 'center' },
            4: { cellWidth: 25, halign: 'center' },
            5: { cellWidth: 25, halign: 'center' },
        },
        theme: 'grid',
    });

    y = doc.lastAutoTable.finalY + 4;

    // ===== BOTTOM SECTION =====
    doc.setDrawColor(...borderColor);
    doc.line(margin, y, margin + contentWidth, y);
    y += 4;

    const bottomLeftX = margin + 4;
    const bottomRightX = headerMid;

    // Left - Invoice Amount in Words
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('Invoice Amount in Words', bottomLeftX, y + 2);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.text(numberToWords(order.summary.total), bottomLeftX, y + 9);

    // Right - Amounts
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.text('Amounts', bottomRightX + 3, y + 2);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const amountStartY = y + 9;
    const amountRightEdge = margin + contentWidth - 4;

    doc.text('Sub Total', bottomRightX + 3, amountStartY);
    doc.text('Rs ' + order.summary.mrp, amountRightEdge, amountStartY, { align: 'right' });

    const gst = Math.round(order.summary.mrp * 0.18);
    doc.text('GST (18%)', bottomRightX + 3, amountStartY + 7);
    doc.text('Rs ' + gst, amountRightEdge, amountStartY + 7, { align: 'right' });

    doc.text('Delivery Charges', bottomRightX + 3, amountStartY + 14);
    doc.text('Rs ' + (order.summary.delivery || 100), amountRightEdge, amountStartY + 14, { align: 'right' });

    doc.text('Handling Charges', bottomRightX + 3, amountStartY + 21);
    doc.text('Rs ' + (order.summary.handling || 100), amountRightEdge, amountStartY + 21, { align: 'right' });

    // Total line
    doc.setDrawColor(...borderColor);
    doc.line(bottomRightX, amountStartY + 25, margin + contentWidth, amountStartY + 25);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Total', bottomRightX + 3, amountStartY + 32);
    doc.setTextColor(...green);
    doc.text('Rs ' + order.summary.total, amountRightEdge, amountStartY + 32, { align: 'right' });

    // Left bottom - Description
    y += 20;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('Description', bottomLeftX, y + 2);

    // ===== TERMS AND SIGNATURE SECTION =====
    y = amountStartY + 42;
    doc.setDrawColor(...borderColor);
    doc.line(margin, y, margin + contentWidth, y);
    y += 5;

    // Terms (left)
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.text('Terms and Condition', bottomLeftX, y + 2);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Thankyou for doing shopping with us', bottomLeftX, y + 9);

    // Signature box (right)
    doc.setDrawColor(...borderColor);
    doc.rect(bottomRightX + 3, y - 2, contentWidth * 0.4, 35);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkGray);
    doc.text('For, Rush Enterprises', bottomRightX + contentWidth * 0.2 + 3, y + 4, { align: 'center' });

    // Signature scribble
    doc.setDrawColor(80, 80, 80);
    doc.setLineWidth(0.5);
    const sigX = bottomRightX + contentWidth * 0.2 + 3;
    const sigY = y + 15;
    doc.line(sigX - 15, sigY, sigX - 8, sigY - 6);
    doc.line(sigX - 8, sigY - 6, sigX - 2, sigY + 2);
    doc.line(sigX - 2, sigY + 2, sigX + 5, sigY - 8);
    doc.line(sigX + 5, sigY - 8, sigX + 10, sigY);
    doc.line(sigX + 10, sigY, sigX + 15, sigY - 3);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('Authorized Signature', bottomRightX + contentWidth * 0.2 + 3, y + 28, { align: 'center' });

    // Save
    doc.save(`RuSH_Invoice_${order.id}.pdf`);
}

#!/usr/bin/perl

use strict;
use warnings;

use JSON;

my @week = ( 'MTWR', 'FRI', 'SAT', 'SUN' );

my %timetable = (
	$week[0] => [], 
	$week[1] => [], 
	$week[2] => [], 
	$week[3] => []
);

while (my $line = <>) {
	$line =~ s/^\s+|[,\s]+$//g;
	
	my ($hour, $minuteCsv) = $line =~ /^(\d{2}),(.*)$/;

	my @minutes = split(',', $minuteCsv);

	my $lastMinute = -1;
	my $weekSegment = 1;

	foreach my $minute (@minutes) {
		if ($minute <= $lastMinute) {
			$weekSegment++;
		}

		push @{ $timetable{$week[$weekSegment]} }, "$hour:$minute";

		if ($weekSegment == 1 && $hour > 3 && $hour < 24) {
			push @{ $timetable{'MTWR'} }, "$hour:$minute";
		}

		$lastMinute = $minute;
	}
}

print encode_json({gliesmaroderstr_m29_hauptbahnhof => \%timetable});

use strict;
use warnings;
use File::Slurp qw(read_file);

my @templates = (
	"*** ahead", 
	"Likely ***", 
	"If Only I had a ***",
	"***, O ***", 
	"Ahh, ***", 
	"No *** ahead", 
	"First off, ***",
	"Didn't expect ***", 
	"Behold, ***!", 
	"***", 
	"*** required ahead",
	"Seek ***", 
	"Visions of ***", 
	"Offer ***", 
	"***!", 
	"Be Wary of ***",
	"Still no ***", 
	"Could this be a ***?", 
	"Praise the ***", 
	"***?",
	"Try ***", 
	"Why is it always ***?", 
	"Time for ***", 
	"Let there be ***",
);

my @conjunction = (
	"and then",
	"or",
	"but",
	"therefore",
	"in short",
	"except",
	"by the way",
	"so to speak",
	"all the more",
	",",
);

my $words_ifile = "elden.txt";
#my $templ_ifile = "templ.txt";
#my $cnjct_ifile = "cnjct.txt";
my @words = read_file($words_ifile);
#my @templ = read_file($templ_ifile);
#my @cnjct = read_file($cnjct_ifile);

my $two_templ = int(rand(2));

my @template_sel;
my @word_sel;
my $word_count = 0;

if($two_templ == 1) {
	my $temp_sel = "";
	do {
		$temp_sel = $templates[int(rand(@templates))];
	} while ($temp_sel =~ /[!?]/g);
	push(@template_sel, $temp_sel);
}

push(@template_sel, $templates[int(rand(@templates))]);

foreach (@template_sel) {
	$word_count += () = $_ =~ /\*\*\*/g;
}

for (1..$word_count) {
	push(@word_sel, $words[int(rand(@words))]);
}

foreach (@template_sel){
	my $sub_count = () = $_ =~ /\*\*\*/g;
	my $word = "";
	if($sub_count > 1){
		$word = shift(@word_sel);
		chomp $word;
		$_ =~ s/\*\*\*/$word/;
	}
	$word = shift(@word_sel);
	chomp $word;
	$_ =~ s/\*\*\*/$word/;
}

print $template_sel[0] . "\n";
if($two_templ == 1){
	print $conjunction[int(rand(@conjunction))] . ", " . $template_sel[1] . "\n";
}
